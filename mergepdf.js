const PDFMerger = require('pdf-merger-js');



async function mergepdfs(pdf1,pdf2){
    var merger = new PDFMerger();
    await merger.add(pdf1)
    await merger.add(pdf2)
 
    await merger.save("mergered.pdf")

   
}

// mergepdfs()

module.exports=mergepdfs;