import {
      initializeApp
    } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


    import {
      getDatabase,
      ref,
      onValue,
      set
    } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


    import {
      getAuth,
      signInWithEmailAndPassword,
      onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

    window.deferredInstallPrompt = null;

    const startupScreen = document.getElementById("startup-screen");

    function hideStartupScreen() {
      if (startupScreen) {
        startupScreen.classList.add("is-hidden");
        const removeStartupScreen = () => {
          startupScreen.remove();
        };

        startupScreen.addEventListener("transitionend", removeStartupScreen, { once: true });
        window.setTimeout(removeStartupScreen, 700);
      }
    }

    if (document.readyState === "complete") {
      window.setTimeout(hideStartupScreen, 1000);
    } else {
      window.addEventListener("load", () => {
        window.setTimeout(hideStartupScreen, 1000);
      }, { once: true });
    }

    const installAppButton =
      document.getElementById("installAppButton");

    function isPwaInstalled() {
      const isStandalone =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(display-mode: standalone)").matches;

      return isStandalone || window.navigator.standalone === true;
    }

    function hideInstallButton() {
      installAppButton.style.display = "none";
    }

    if (isPwaInstalled()) {
      hideInstallButton();
    }

    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();

      if (isPwaInstalled()) {
        return;
      }

      window.deferredInstallPrompt = event;
      installAppButton.style.display = "inline-flex";
    });

    installAppButton.addEventListener("click", async () => {
      const installPrompt = window.deferredInstallPrompt;

      if (!installPrompt) {
        hideInstallButton();
        return;
      }

      try {
        await installPrompt.prompt();

        const { outcome } = await installPrompt.userChoice;
        console.log("PWA install choice:", outcome);
      } catch (error) {
        console.error("Não foi possível iniciar a instalação da PWA:", error);
      } finally {
        window.deferredInstallPrompt = null;
        hideInstallButton();
      }
    });

    window.addEventListener("appinstalled", () => {
      window.deferredInstallPrompt = null;
      hideInstallButton();
      console.log("PWA instalada.");
    });

        /* =================================
           FIREBASE CONFIG
           ================================= */

    const firebaseConfig = {

      apiKey:
        "AIzaSyA3AJKnPItmOGUYGZbT68MajrNbPmYWv_k",

      authDomain:
        "planta-e-gota.firebaseapp.com",

      databaseURL:
        "https://planta-e-gota-default-rtdb.firebaseio.com",

      projectId:
        "planta-e-gota",

      storageBucket:
        "planta-e-gota.firebasestorage.app",

      messagingSenderId:
        "455916603660",

      appId:
        "1:455916603660:web:427e7df7f0a6242646e129",

      measurementId:
        "G-VZMYW43MKZ"

    };


    const app =
      initializeApp(firebaseConfig);


    const db =
      getDatabase(app);

    const auth = getAuth(app)


    /* =================================
       CAMINHOS FIREBASE
       ================================= */

    const sensorsRef =
      ref(db, "horta/sensores");


    const pumpRef =
      ref(db, "horta/controle/bomba");


    const modeRef =
      ref(db, "horta/controle/modo");


    const waterRef =
      ref(db, "horta/consumo/hoje");


    const weeklyRef =
      ref(db, "horta/relatorios/semana");


    /* =================================
       ESTADOS
       ================================= */

    let currentPumpState = false;

    let currentMode = "automatico";

    let waterToday = 0;


    let currentSensors = {

      solo1: 0,

      solo2: 0,

      solo3: 0,

      solo4: 0,

      temperatura: 0,

      umidadeAr: 0

    };


    /* =================================
       NAVEGAÇÃO
       ================================= */

    const views = {

      home:
        document.getElementById("view-home"),

      sensors:
        document.getElementById("view-sensors"),

      reports:
        document.getElementById("view-reports"),

      missions:
        document.getElementById("view-missions"),

      about:
        document.getElementById("view-about")

    };


    document
      .querySelectorAll(".nav-btn")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const target =
              button.dataset.view;


            Object
              .values(views)
              .forEach(view => {

                view.classList
                  .remove("active");

              });


            if (views[target]) {

              views[target]
                .classList
                .add("active");

            }


            document
              .querySelectorAll(".nav-btn")
              .forEach(btn => {

                btn.classList
                  .remove("active");

              });


            button.classList
              .add("active");


            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });

          }

        );

      });


    /* =================================
       SENSORES
       ================================= */

    onValue(
      sensorsRef,
      snapshot => {

        const data =
          snapshot.val();


        if (!data) {
          return;
        }


        currentSensors = data;


        const solo1 =
          Number(data.solo1 ?? 0);


        const solo2 =
          Number(data.solo2 ?? 0);


        const solo3 =
          Number(data.solo3 ?? 0);


        const solo4 =
          Number(data.solo4 ?? 0);


        const temperatura =
          Number(
            data.temperatura ?? 0
          );


        const umidadeAr =
          Number(
            data.umidadeAr ?? 0
          );


        document.getElementById(
          "solo1"
        ).textContent =
          solo1 + "%";


        document.getElementById(
          "solo2"
        ).textContent =
          solo2 + "%";


        document.getElementById(
          "solo3"
        ).textContent =
          solo3 + "%";


        document.getElementById(
          "solo4"
        ).textContent =
          solo4 + "%";


        document.getElementById(
          "temperature"
        ).textContent =
          temperatura.toFixed(1) + "°C";


        document.getElementById(
          "air-humidity"
        ).textContent =
          umidadeAr + "%";


        const mediaSolo =
          (
            solo1 +
            solo2 +
            solo3 +
            solo4
          ) / 4;


        document.getElementById(
          "home-soil"
        ).textContent =
          Math.round(mediaSolo) + "%";


        document.getElementById(
          "home-temperature"
        ).textContent =
          temperatura.toFixed(1) + "°C";


        document.getElementById(
          "home-health"
        ).textContent =
          Math.round(mediaSolo) + "%";


        document.getElementById(
          "report-health"
        ).textContent =
          Math.round(mediaSolo) + "%";


        updateReports();

      }

    );


    /* =================================
       BOMBA
       ================================= */

    onValue(
      pumpRef,
      snapshot => {

        currentPumpState =
          snapshot.val() === true;


        updatePumpInterface();

      }

    );


    /* =================================
       MODO
       ================================= */

    onValue(
      modeRef,
      snapshot => {

        const value =
          snapshot.val();


        if (value === "manual") {

          currentMode =
            "manual";

        } else {

          currentMode =
            "automatico";

        }


        updateControlInterface();

      }

    );


    /* =================================
       ÁGUA
       ================================= */

    onValue(
      waterRef,
      snapshot => {

        const value =
          snapshot.val();


        if (
          typeof value ===
          "number"
        ) {

          waterToday =
            value;

        }

        else if (
          value &&
          typeof value ===
          "object"
        ) {

          waterToday =
            Number(
              value.litros ??
              value.total ??
              0
            );

        }

        else {

          waterToday = 0;

        }


        updateWaterInterface();

      }

    );


    /* =================================
       RELATÓRIO SEMANAL
       ================================= */

    onValue(
      weeklyRef,
      snapshot => {

        const data =
          snapshot.val();


        const element =
          document.getElementById(
            "weekly-report"
          );


        if (!data) {

          element.textContent =
            "Nenhum relatório semanal disponível.";

          return;

        }


        if (
          typeof data ===
          "string"
        ) {

          element.textContent =
            data;

          return;

        }


        const consumo =
          data.consumo ??
          data.consumoTotal ??
          "--";


        const economia =
          data.economia ??
          data.economiaPercentual ??
          "--";


        element.textContent =
          `Consumo semanal: ${consumo} L. Economia registrada: ${economia}%.`;

      }

    );


    /* =================================
       INTERFACE DA BOMBA
       ================================= */

    function updatePumpInterface() {

      const status =
        currentPumpState
          ? "Ligada"
          : "Desligada";


      document.getElementById(
        "home-pump"
      ).textContent =
        status;


      document.getElementById(
        "sensor-pump"
      ).textContent =
        status;


      const controlStatus =
        document.getElementById(
          "control-pump-status"
        );


      if (controlStatus) {

        controlStatus.textContent =
          status;


        controlStatus.style.color =
          currentPumpState
            ? "#2e7d32"
            : "#777";

      }


      const button =
        document.getElementById(
          "control-pump-btn"
        );


      if (button) {

        button.textContent =
          currentPumpState
            ? "DESLIGAR BOMBA"
            : "LIGAR BOMBA";

      }

    }


    /* =================================
       ÁGUA
       ================================= */

    function updateWaterInterface() {

      const value =
        Number(
          waterToday || 0
        );


      const formatted =
        value.toFixed(2) + " L";


      document.getElementById(
        "home-water"
      ).textContent =
        formatted;


      document.getElementById(
        "water-today"
      ).textContent =
        formatted;


      document.getElementById(
        "report-water"
      ).textContent =
        formatted;

    }


    /* =================================
       RELATÓRIOS
       ================================= */

    function updateReports() {

      const solo = [

        Number(
          currentSensors.solo1 ?? 0
        ),

        Number(
          currentSensors.solo2 ?? 0
        ),

        Number(
          currentSensors.solo3 ?? 0
        ),

        Number(
          currentSensors.solo4 ?? 0
        )

      ];


      const media =
        (
          solo[0] +
          solo[1] +
          solo[2] +
          solo[3]
        ) / 4;


      let valor =
        Math.round(media);


      if (valor < 0) {
        valor = 0;
      }


      if (valor > 100) {
        valor = 100;
      }


      document.getElementById(
        "report-saving"
      ).textContent =
        valor + "%";


      document.getElementById(
        "saving-label"
      ).textContent =
        valor + "%";


      document.getElementById(
        "saving-bar"
      ).style.width =
        valor + "%";

    }


    /* =================================
       CONTROLE DA BOMBA
       ================================= */

    const openControl =
      document.getElementById(
        "open-control"
      );


    const controlModal =
      document.getElementById(
        "control-modal"
      );


    const controlLogin =
      document.getElementById(
        "control-login"
      );


    const controlPanel =
      document.getElementById(
        "control-panel"
      );


    const controlLoginForm =
      document.getElementById(
        "control-login-form"
      );


    const controlPassword =
      document.getElementById(
        "control-password"
      );


    const controlLoginError =
      document.getElementById(
        "control-login-error"
      );


    const closeControl =
      document.getElementById(
        "close-control"
      );


    const closeControlLogin =
      document.getElementById(
        "close-control-login"
      );


    const modeAuto =
      document.getElementById(
        "mode-auto"
      );


    const modeManual =
      document.getElementById(
        "mode-manual"
      );


    const automaticInfo =
      document.getElementById(
        "automatic-info"
      );


    const manualInfo =
      document.getElementById(
        "manual-info"
      );


    const controlPumpBtn =
      document.getElementById(
        "control-pump-btn"
      );


    /* =================================
       SENHA
       ================================= */

    const SENHA_CONTROLE =
      "horta2026";


    /* =================================
       ABRIR PELO 🔔
       ================================= */

    openControl.addEventListener(
      "click",
      () => {

        controlModal
          .classList
          .add("show");


        controlLogin.style.display =
          "block";


        controlPanel.style.display =
          "none";


        controlPassword.value =
          "";


        controlLoginError.style.display =
          "none";


        setTimeout(
          () => {

            controlPassword.focus();

          },
          100
        );

      }
    );


    /* =================================
       FECHAR CONTROLE
       ================================= */

    function closeControlModal() {

      controlModal
        .classList
        .remove("show");


      controlLogin.style.display =
        "block";


      controlPanel.style.display =
        "none";


      controlPassword.value =
        "";


      controlLoginError.style.display =
        "none";

    }


    closeControl.addEventListener(
      "click",
      closeControlModal
    );


    closeControlLogin.addEventListener(
      "click",
      closeControlModal
    );


    controlModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          controlModal
        ) {

          closeControlModal();

        }

      }
    );


    /* =================================
       LOGIN
       ================================= */

    controlLoginForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const senha =
          controlPassword.value;


        if (
          senha ===
          SENHA_CONTROLE
        ) {

          controlLogin.style.display =
            "none";


          controlPanel.style.display =
            "block";


          updateControlInterface();

        }

        else {

          controlLoginError.style.display =
            "block";


          controlPassword.value =
            "";


          controlPassword.focus();

        }

      }
    );


    /* =================================
       ATUALIZAR PAINEL
       ================================= */

    function updateControlInterface() {

      if (
        currentMode ===
        "manual"
      ) {

        modeManual
          .classList
          .add("active");


        modeAuto
          .classList
          .remove("active");


        automaticInfo.style.display =
          "none";


        manualInfo.style.display =
          "block";


        controlPumpBtn.disabled =
          false;

      }

      else {

        modeAuto
          .classList
          .add("active");


        modeManual
          .classList
          .remove("active");


        automaticInfo.style.display =
          "block";


        manualInfo.style.display =
          "none";


        controlPumpBtn.disabled =
          true;

      }


      updatePumpInterface();

    }


    /* =================================
       MODO AUTOMÁTICO
       ================================= */

    modeAuto.addEventListener(
      "click",
      async () => {

        try {

          /*
             Primeiro muda o modo.
          */

          await set(
            modeRef,
            "automatico"
          );


          currentMode =
            "automatico";


          updateControlInterface();

        }

        catch (error) {

          console.error(
            "Erro ao mudar para automático:",
            error
          );


          alert(
            "Erro ao mudar para automático."
          );

        }

      }
    );


    /* =================================
       MODO MANUAL
       ================================= */

    modeManual.addEventListener(
      "click",
      async () => {

        try {

          await set(
            modeRef,
            "manual"
          );


          currentMode =
            "manual";


          updateControlInterface();

        }

        catch (error) {

          console.error(
            "Erro ao mudar para manual:",
            error
          );


          alert(
            "Erro ao mudar para manual."
          );

        }

      }
    );


    /* =================================
       LIGAR / DESLIGAR
       ================================= */

    controlPumpBtn.addEventListener(
      "click",
      async () => {

        /*
          Só permite controle direto
          quando estiver em MANUAL.
        */

        if (
          currentMode !==
          "manual"
        ) {

          return;

        }


        try {

          const novoEstado =
            !currentPumpState;


          await set(
            pumpRef,
            novoEstado
          );

        }

        catch (error) {

          console.error(
            "Erro ao controlar a bomba:",
            error
          );


          alert(
            "Não foi possível controlar a bomba."
          );

        }

      }
    );


    /* =================================
       INICIALIZAÇÃO
       ================================= */

    updatePumpInterface();

    updateControlInterface();

    updateWaterInterface();

    updateReports();


    console.log(
      "================================"
    );

    console.log(
      "HORTA INTELIGENTE"
    );

    console.log(
      "Firebase conectado"
    );

    console.log(
      "Bomba:",
      "horta/controle/bomba"
    );

    console.log(
      "Modo:",
      "horta/controle/modo"
    );

    console.log(
      "================================"
    );