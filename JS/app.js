function getSelectionsListe(id) {
  const liste = document.getElementById(id);
  const rtl = "\n";
  let lsSelections = "";
  for (let i = 0; i < liste.options.length; i++) {
    if (liste.options[i].selected) {
      lsSelections += liste.options[i].value + "," + rtl;
    }
  }
  return `${lsSelections.substring(0, lsSelections.length - 2)}.`;
}

const spacer = {
  blank: function () {
    return " ";
  },

  newline: function () {
    return "\n";
  },

  line: function (length, character) {
    let s = "";
    for (let i = 0; i < length; i++) {
      s += character;
    }
    return s;
  },

  wrap: function (text, length, character) {
    let padLength = (length - text.length) / 2 - 1;
    let wrapText = character + spacer.line(padLength, " ") + text;
    wrapText += spacer.line(padLength, " ");
    return wrapText;
  },

  box: function (text, character) {
    let boxText = spacer.newline();
    let length = text.length + 38;
    if (character === "=") length = 25;
    if (character === "*") length = 40;

    boxText += spacer.line(length, character) + spacer.newline();
    boxText += spacer.wrap(text, length, character) + spacer.newline();
    boxText += spacer.line(length, character) + spacer.newline();
    return boxText;
  },
};

function rmNastyChars(ch) {
  ch = ch.replaceAll("'", " ");
  ch = ch.replaceAll(/[:()"]/g, "");
  ch = ch.replaceAll(/(^ +)/gm, "");
  ch = ch.replaceAll(/^> +/gm, "- ");
  ch = ch.replaceAll(/^>./gm, "- ");
  ch = ch.replaceAll(/^(=> +)/gm, "- ");
  ch = ch.replaceAll(/^(=>.)/gm, "- ");
  ch = ch.replaceAll(/^(\* +)/gm, "- ");
  ch = ch.replaceAll(/^(\*.)/gm, "- ");
  ch = ch.replaceAll(/(?!^)-/gm, "_");
  ch = ch.replaceAll(/(\/+)/gm, "//");
  // lignes vides en double
  ch = ch.replaceAll(/\n\n+/g, "\n\n");
  return ch;
}

function affichage() {
  // storeAndCheck();
  let bil = "";
  const esp = " ";
  const rtl = "\n";
  const egal = "=";
  // <--donnees a tester-->
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let remarques = document.getElementById("remarques").value;
  let entree = document.getElementById("entree");
  let civilite = document.getElementById("civilite").value;
	let douleurRepos = document.getElementById("douleurRepos").value;
	let douleurMob = document.getElementById("douleurMob").value;
	let douleurTotal = parseInt(douleurRepos) + parseInt(douleurMob);
	console.log(douleurTotal);

  let nch = null; // numero de chambre
  let cote = null; // cote
  /* les chaines les plus longues de chaque rubrique expl: fonctionnelle */
  const marche = "Marche (périmètre, aides techniques ...): ";
  const lplfonc = marche.length;
  const assis = "Équilibre assis: ";
  const debout = "Équilibre debout: ";
  const transferts = "Transferts (lit vers fauteuil): ";
  const doubletache = "Double tâche: ";
  const oedeme = "Oedème: ";
  const hematome = "Hématome: ";
  const inflamation = "Inflammation: ";
  const amyotrophie = "Amyotrophie: ";
  const mobilisation = "A la mobilisation: ";
  const repos = "Au repos:";
  const lpldoul = mobilisation.length;

  // bil += spacer.box("Bilan Kinésithérapique",fois);
  bil +=
    document.getElementById("civilite").value +
    esp +
    nom.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()) +
    esp +
    prenom.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

  nch = document.getElementById("chambre").value;

  cote = document.getElementById("cote").value;
  cote = cote.toUpperCase();
  const regex = /^[0-9]+$/;
  if (nch.match(regex)) {
    bil += "  CH " + document.getElementById("chambre").value;
    if (cote === "P" || cote === "F") {
      bil += " L" + cote;
    }
  }
  if (civilite === "Madame") {
    bil += rtl + "Entrée le " + frenchdate(entree.value);
  } else {
    bil += rtl + "Entré le " + frenchdate(entree.value);
  }

  if (document.getElementById("anamnese").value !== "") {
    bil += rtl + rtl + `======= Anamnèse  =======`;
    bil += rtl + rtl + document.getElementById("anamnese").value;
  }

  if (document.getElementById("histoire").value !== "") {
    bil += rtl + rtl + `======= Histoire de la maladie  =======`;
    bil += rtl + rtl + document.getElementById("histoire").value;
  }
  if (document.getElementById("modeDeVie").value !== "") {
    bil += rtl + rtl + `======= Mode de vie  =======`;
    bil += rtl + rtl + document.getElementById("modeDeVie").value;
  }
  if (document.getElementById("atcd").value !== "") {
    bil += rtl + rtl + `======= Antécédants  =======`;
    bil += rtl + rtl + document.getElementById("atcd").value;
  }
  bil +=
    rtl +
    rtl +
    `======= Prescription médicale  =======` +
    rtl +
    rtl +
    document.getElementById("pec").value;
  if (document.getElementById("operation").value !== "") {
    bil +=
      rtl +
      rtl +
      "Date de l'opération: " +
      frenchdate(document.getElementById("operation").value) +
      rtl;
  }
  if (document.getElementById("appui").value !== "") {
    bil +=
      rtl +
      "Appui ( total/limité/sans appui ): " +
      document.getElementById("appui").value;
  }
  if (document.getElementById("immobilisation").value !== "") {
    bil += rtl + spacer.box("Immobilisation", egal);
    bil += rtl + rtl + getSelectionsListe("immobilisation");
  }
  bil += rtl + spacer.box(" Cotation de la Douleur EVS", egal);
  bil +=
    rtl +
    " 0 = pas de douleur, 1 = faible, 2 = moyenne, 3 = forte, 4 = très forte.";
	if (douleurTotal > 0){
		bil += rtl + rtl + "====== Intensité ======";
		bil +=
		rtl + rtl +
			repos +
			spacer.line(lpldoul - repos.length + 3, ".") +
			" " + douleurRepos +
			"/4";
		bil +=
		rtl +
			mobilisation +
			" " +
			douleurMob +
			"/4";
		bil += rtl + rtl + "====== Type ======" + rtl + rtl + getSelectionsListe("typeDouleur");
		bil += rtl + rtl + "====== Localisation ======" + rtl + rtl + document.getElementById("localisation").value;
	} else {
		let elleOUlui = civilite == "Madame" ? "elle":"lui"; 
		const tablnodolor = [
			"ne relate pas de douleur", 
			"absence de douleur",
			"ne ressent aucune douleur", 
			"pas de douleur",
			"aucune sensation de douleur",
			"pas la moindre douleur",
			"aucune douleur à signaler",
			"aucune douleur à déclarer",
			"est complétement indolent"
		];
		const randomPhrase = tablnodolor[Math.floor(Math.random() * tablnodolor.length)];
        bil += rtl + rtl + "====== Intensité ======" + rtl + rtl;
        bil += "Au repos............. 0//4" + rtl;
        bil += "A la mobilisation  0//4";
		bil += rtl + rtl + `${randomPhrase} selon ${elleOUlui}.`;
	}
  bil += rtl + spacer.box("Fonctionnel", egal);
  bil +=
    rtl +
    assis +
    spacer.line(lplfonc - assis.length + 5, ".") +
    " " +
    document.getElementById("assis").value;
  bil +=
    rtl +
    debout +
    spacer.line(lplfonc - debout.length, ".") +
    spacer.line(2, ".") +
    " " +
    document.getElementById("debout").value;
  bil +=
    rtl +
    transferts +
    spacer.line(lplfonc - transferts.length, ".") +
    " " +
    document.getElementById("transferts").value;
  bil +=
    rtl +
    doubletache +
    spacer.line(lplfonc - doubletache.length + 1, ".") +
    spacer.line(3, ".") +
    " " +
    document.getElementById("doubleTache").value;
  bil +=
    rtl + rtl + "Autonomie AVJ: " + document.getElementById("autonomie").value;
  bil += rtl + rtl + marche + document.getElementById("marche").value;
  bil += rtl + spacer.box("Trophicité", egal);
  bil +=
    rtl +
    oedeme +
    spacer.line(lplfonc - oedeme.length + 4, ".") +
    " " +
    document.getElementById("oedeme").value;
  bil +=
    rtl +
    hematome +
    spacer.line(lplfonc - hematome.length, ".") +
    spacer.line(2, ".") +
    " " +
    document.getElementById("hematome").value;
  bil +=
    rtl +
    amyotrophie +
    spacer.line(lplfonc - amyotrophie.length + 1, ".") +
    " " +
    document.getElementById("amyotrophie").value;
  bil +=
    rtl +
    inflamation +
    spacer.line(lplfonc - inflamation.length + 1, ".") +
    " " +
    document.getElementById("inflamation").value;
  if (remarques !== "") {
    bil += rtl + rtl + "A noter: " + rtl + remarques;
  }
  if (document.getElementById("attitudeVicieuse").value !== "") {
    bil += rtl + spacer.box("Articulaire", egal);
    bil +=
      rtl +
      "Attitude vicieuse: " +
      document.getElementById("attitudeVicieuse").value;
    bil += rtl + "Amplitude: " + document.getElementById("amplitude").value;
  }
  bil += rtl + spacer.box("Musculaire", egal);
  bil +=
    rtl +
    "Verrouillage quadriceps: " +
    rtl +
    document.getElementById("verrouillage").value;
  bil +=
    rtl +
    rtl +
    "Autres groupes musculaires: " +
    document.getElementById("autres").value;
  bil +=
    rtl +
    spacer.box(" Fonctions Supérieures", egal) +
    rtl +
    document.getElementById("fonctionsSuperieures").value;
  if (document.getElementById("fonctionsRespiratoires").value !== "") {
    bil +=
      rtl +
      spacer.box(" Fonctions Respiratoires", egal) +
      rtl +
      document.getElementById("fonctionsRespiratoires").value;
  }
  bil +=
    rtl +
    spacer.box(
      " Projet kiné du patient (attentes et besoins du patient)",
      egal
    ) +
    rtl +
    document.getElementById("projetKine").value;
  bil +=
    rtl +
    spacer.box(" Objectifs et prise en charge", egal) +
    rtl +
    document.getElementById("priseEnChargePrev").value;
  bil = rmNastyChars(bil);

  const toCopy = document.getElementById("to-copy");
  toCopy.value = bil;
  toCopy.select();
  navigator.clipboard.writeText(toCopy.value);

  const modal = document.getElementById("modal");
  modal.classList.add("show");
  disableScrolling();

  function modalClosePerKey(e) {
    if (e.key === "Escape") {
      const toCopy = document.getElementById("to-copy");
      toCopy.select();
      navigator.clipboard.writeText(toCopy.value);

      // navigator.clipboard.writeText(theCopy.value);
      document.removeEventListener("keyup", modalClosePerKey);
      modal.classList.remove("show");
      enableScrolling();
    }
  }

  document.addEventListener("keyup", modalClosePerKey);

  // fermeture de la modale
  const modalClose = document.querySelectorAll("[data-dismiss=dialog]");

  for (let close of modalClose) {
    close.addEventListener("click", () => {
      modal.classList.remove("show");
      enableScrolling();
    });
    // copie du texte de la modale dans le clipboard
    const btnCopy = document.getElementById("to-copy");

    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(toCopy.value);
    });
  }

  modal.addEventListener("click", function () {
    enableScrolling();
    this.classList.remove("show");
  });

  // on stop la propagation vers le bas
  modal.children[0].addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}

function replaceSelection(idfield, idoption) {
  const d = document.getElementById(idoption);
  const elem = document.getElementById(idfield);

  function listenKeyUpOnOptions(e) {
    e.preventDefault();
    if (e.code === "Space" || e.code === "Enter") {
      let word = d.options[d.selectedIndex].value;
      document.getElementById(idoption).size = 1;
      word = word.replace(/\s\s+/g, " ");
      const from = elem.selectionStart;
      const to = elem.selectionEnd;
      elem.value = elem.value.slice(0, from) + word + elem.value.slice(to);
      elem.selectionStart = from + word.length;
      elem.selectionEnd = from + word.length;
      document.getElementById(idoption).selectedIndex = 0;
      elem.focus();
      d.removeEventListener("keyup", listenClickOnOptions);
    }
  }

  d.addEventListener("keyup", listenKeyUpOnOptions, false);

  function listenClickOnOptions(e) {
    e.preventDefault();
    let word = d.options[d.selectedIndex].value;
    document.getElementById(idoption).size = 1;
    word = word.replace(/\s\s+/g, " ");
    const from = elem.selectionStart;
    const to = elem.selectionEnd;
    elem.value = elem.value.slice(0, from) + word + elem.value.slice(to);
    elem.selectionStart = from + word.length;
    elem.selectionEnd = from + word.length;
    document.getElementById(idoption).selectedIndex = 0;
    elem.focus();
    d.removeEventListener("click", listenClickOnOptions);
  }

  d.addEventListener("click", listenClickOnOptions, false);
}

function frenchdate(strDate) {
  const ch = strDate.split("-").reverse().join("/");
  return ch;
}

const efface = document.getElementById("reinitialise");
efface.addEventListener("click", () => location.reload(true), false);

// select on focus on deroule

function optionsResize() {
  const chselect = document.querySelectorAll("select");
  const seltab = Array.from(chselect);
  seltab.forEach((elem) => {
    elem.addEventListener(
      "focus",
      function (event) {
        event.target.size = elem.options.length;
      },
      false
    );
  });

  seltab.forEach((elem) =>
    elem.addEventListener(
      "blur",
      function (event) {
        event.target.size = 1;
      },
      false
    )
  );
}

optionsResize();

function heure() {
  var h = new Date();
  document.getElementById("temps").innerHTML =
    (h.getHours() < 10 ? "0" + h.getHours() : h.getHours()) +
    ":" +
    (h.getMinutes() < 10 ? "0" + h.getMinutes() : h.getMinutes()) +
    ":" +
    (h.getSeconds() < 10 ? "0" + h.getSeconds() : h.getSeconds());
  setTimeout(heure, 1000);
}

heure();

function fdate() {
  const date = new Date();
  const nday = date.getDate() + 1 < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const year = date.getFullYear() - 2000;
  const laDate = nday + "/" + month + "/" + year;
  document.getElementById("laDate").innerHTML = laDate;
  date.setDate(date.getDate() - 1);
  document.getElementById("entree").valueAsDate = date;
}

fdate();

function rmuglyspaces(id) {
  ch = document.getElementById(id).value;
  ch = ch.replace(/^\s*/gm, "");
  ch = ch.replace(/  +/g, " ");
  document.getElementById(id).value = ch;
}

function parseDate(str) {
  var mdy = str.split("-");
  return new Date(mdy[0], mdy[1] - 1, mdy[2]); //ma version
  //return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

const plus1j = () => {
  const plus = document.querySelector(".plus1j");
  plus.addEventListener("click", () => {
    let date = document.getElementById("entree").valueAsDate;
    date.setDate(date.getDate() + 1);
    document.getElementById("entree").valueAsDate = date;
  });
};

const moins1j = () => {
  const moins = document.querySelector(".moins1j");
  moins.addEventListener("click", () => {
    let date = document.getElementById("entree").valueAsDate;
    date.setDate(date.getDate() - 1);
    document.getElementById("entree").valueAsDate = date;
  });
};

plus1j();
moins1j();
