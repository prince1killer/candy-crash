document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    const width = 8;
    const box = [];
    let score = 0;
    const candyImages = [
        'url(./images/candy-red.png)',
        'url(./images/candy-2.png)',
        'url(./images/candy-3.png)',
        'url(./images/candy-4.png)',
        'url(./images/candy-5.png)',
        'url(./images/candy-6.png)',
    ];

    //=============== CREATING BOAD ===================
    const createBoad = () => {
        for(let i=0; i<width*width; i++){
            const square = document.createElement("div");
            const rendomImage = Math.floor(Math.random()*candyImages.length);
            square.style.backgroundImage = candyImages[rendomImage];
            square.style.backgroundSize = 'cover';
            square.setAttribute('draggable',true);
            square.setAttribute('id',i);
            grid.appendChild(square);
            box.push(square);
        }
    }
    createBoad();


    let imageBeingDraged, imageBeingReplace, squareIdDragged, squareIdReplaced;

    box.forEach(square => square.addEventListener('dragstart',dragStart))
    box.forEach(square => square.addEventListener('dragend',dragEnd))
    box.forEach(square => square.addEventListener('dragenter',dragEnter))
    box.forEach(square => square.addEventListener('dragleave',dragLeave))
    box.forEach(square => square.addEventListener('dragover',dragOver))
    box.forEach(square => square.addEventListener('drop',dragDrop))




    function dragStart(){
        imageBeingDraged = this.style.backgroundImage;
        squareIdDragged = parseInt(this.id);
        console.log(this.id+" Dragged")
    }
    function dragOver(e){
        e.preventDefault();
    }
    function dragLeave(e){
        e.preventDefault();
    }
    function dragEnter(){
    }
    function dragDrop(){
        imageBeingReplace = this.style.backgroundImage;
        squareIdReplaced = parseInt(this.id);
        this.style.backgroundImage = imageBeingDraged;
        box[squareIdDragged].style.backgroundImage = imageBeingReplace;

    }
    function dragEnd(){
        let validMoves = [
            squareIdDragged -1,
            squareIdDragged -width,
            squareIdDragged + 1,
            squareIdDragged + width
        ];
        let validMove  = validMoves.includes(squareIdReplaced)
        if(squareIdReplaced && validMove){
            squareIdReplaced = null;
        }
        else if(squareIdReplaced && !validMove){
            box[squareIdReplaced].style.backgroundImage = imageBeingReplace;
            box[squareIdDragged].style.backgroundImage = imageBeingDraged;
        }
        else{
            box[squareIdDragged].style.backgroundImage = imageBeingDraged;
        }
    }

    function checkForRowThree(){
        for(let i=0;i<61;i++){
            let rowOfThree = [i,i+1,i+2];
            let decidedImage = box[i].style.backgroundImage;
            const isBlank = box[i].style.backgroundImage === '';
            const notValid = [6,7,14,15,22,30,31,38,39,46,47,54,55];
            if(notValid.includes(i))continue
            if(rowOfThree.every(index=>box[index].style.backgroundImage === decidedImage && !isBlank)){
                rowOfThree.forEach(index=>{
                    box[index].style.backgroundImage = '';
                    console.log(box[index].style.backgroundImage);
                })
            }
        }
    }
    checkForRowThree();
    function checkForColoumThree(){
        for(let i=0;i<47;i++){
            let coloumOfThree = [i,i+width,i+width*2];
            let decidedImage = box[i].style.backgroundImage;
            const isBlank = box[i].style.backgroundImage === '';
            // const notValid = [6,7,14,15,22,30,31,38,39,46,47,54,55];
            // if(notValid.includes(i))continue
            if(coloumOfThree.every(index=>box[index].style.backgroundImage === decidedImage && !isBlank)){
                coloumOfThree.forEach(index=>{
                    box[index].style.backgroundImage = '';
                    console.log(box[index].style.backgroundImage);
                })
            }
        }
    }
    checkForColoumThree();













    
    function checkForRowFour(){
        for(let i=0;i<61;i++){
            let rowOfFour = [i,i+1,i+2,i+3];
            let decidedImage = box[i].style.backgroundImage;
            const isBlank = box[i].style.backgroundImage === '';
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            if(notValid.includes(i))continue
            if(rowOfFour.every(index=>box[index].style.backgroundImage === decidedImage && !isBlank)){
                rowOfFour.forEach(index=>{
                    box[index].style.backgroundImage = '';
                    console.log(box[index].style.backgroundImage);
                })
            }
        }
    }
    checkForRowThree();
    function checkForColoumFour(){
        for(let i=0;i<47;i++){
            let coloumOfFour = [i,i+width,i+width*2,i+width*3];
            let decidedImage = box[i].style.backgroundImage;
            const isBlank = box[i].style.backgroundImage === '';
            // const notValid = [6,7,14,15,22,30,31,38,39,46,47,54,55];
            // if(notValid.includes(i))continue
            if(coloumOfFour.every(index=>box[index].style.backgroundImage === decidedImage && !isBlank)){
                coloumOfFour.forEach(index=>{
                    box[index].style.backgroundImage = '';
                    console.log(box[index].style.backgroundImage);
                })
            }
        }
    }
    checkForColoumThree();






    function moveDown(){
        for(let i =0;i<=55;i++){
            if(box[i+width].style.backgroundImage === ''){
                box[i+width].style.backgroundImage = box[i].style.backgroundImage;
                box[i].style.backgroundImage = '';
                const firstRow = [0,1,2,3,4,5,6,7];
                const isFirstRow = firstRow.includes(i);
                if(isFirstRow && box[i].style.backgroundImage === ''){
                    let rendomImage = Math.floor(Math.random()*candyImages.length)
                    box[i].style.backgroundImage = candyImages[rendomImage];
                }
            }
        }
    }
    setInterval(()=>{
        checkForRowFour();
        checkForColoumFour();
        checkForRowThree();
        checkForColoumThree();
        moveDown();
    },100)
    console.log(grid)
})