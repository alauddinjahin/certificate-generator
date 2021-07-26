
// docs link :  https://pdf-lib.js.org

const generatePDF = async(...arguments)=>{

    const {PDFDocument,rgb} = PDFLib;
    const url               = './md_alauddin_new_cv.pdf';
    const fontUrl           = './ZenTokyoZoo-Regular.ttf';
    const existingPdfBytes  = await fetch(url).then(res => res.arrayBuffer());
    const exFont            = await fetch(fontUrl).then(res => res.arrayBuffer());
    const pdfDoc            = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const customFont        = await pdfDoc.embedFont(exFont);
    const pages             = pdfDoc.getPages();
    const page1             = pages[pages.length -1];
    const text              = arguments.length ? arguments[0] : 'Thanks ...';
    page1.drawText(text,{
        x: 200,
        y: 200,
        size:58,
        font:customFont,
        color: rgb(0.8,0.5,0.27),
    })

    const pdfDataUri        = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
    // window.open(pdfDataUri)

    if(arguments?.length){
        const pdfBytes = await pdfDoc.save();
        let random = Math.floor(Math.random() * 10000);
        let file = new File(
            [pdfBytes],
            `${random}.pdf`,
            {
              type: "application/pdf;charset=utf-8",
            }
          );
        saveAs(file);
    }

    console.log("Done creating");
}

generatePDF();

const greeting      = document.getElementById("greeting");
const submitBtn     = document.getElementById("submitBtn");
const capitalize    = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );


submitBtn.addEventListener("click", () => {
  const val = capitalize(greeting.value);

  //check if the text is empty or not
  if (val.trim() !== "" && greeting.checkValidity()) {
    generatePDF(val);
  } else {
    greeting.reportValidity();
  }

});