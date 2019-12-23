import { createWorker } from "tesseract.js";

window.onload = function() {
  const worker = createWorker({
    langPath: "https://tessdata.projectnaptha.com/4.0.0"
  });

  const textH1 = document.getElementById("text");
  const fileInput = document.getElementById("file");

  fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    textH1.innerText = "Cargando...";
    const image = document.getElementById("image");
    image.src = window.URL.createObjectURL(file);
    image.removeAttribute("hidden");

    load(textH1, file);
  });

  async function load(textH1, file) {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text }
    } = await worker.recognize(file);
    textH1.innerText = text;
    //await worker.terminate();
  }
};
