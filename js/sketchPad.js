class SketchPad{
    constructor(container,size=400){
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow:0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);

        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        this.undoButton = document.createElement('button');
        this.undoButton.innerHTML = "Undo";
        container.appendChild(this.undoButton);

        this.ctx = this.canvas.getContext('2d');

        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
        this.reset();
        this.#addEventListeners();
    
    }
    reset(){
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }
    #addEventListeners(){
        this.canvas.onmousedown = (e)=>{
            const mouse = this.#getMouse(e);
            this.paths.push([mouse]);
            this.isDrawing = true;
            console.log(this.paths);
        }
        this.canvas.onmousemove = (e)=>{
            if(this.isDrawing){
            const mouse = this.#getMouse(e);
            const lastPath = this.paths[this.paths.length-1];
            lastPath.push(mouse);
            this.#redraw();
            console.log(this.paths);
            }
        }
        this.canvas.onmouseup = ()=>{
            this.isDrawing = false;
        }
        this.canvas.ontouchstart = (e)=>{
            const loc = e.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (e)=>{
            const loc = e.touches[0];
            this.canvas.onmousemove(loc);
        }
        this.canvas.ontouchend = ()=>{
            this.canvas.onmouseup();
        }
        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
    }
    #redraw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        draw.paths(this.ctx,this.paths)
        if(this.paths.length>0){
            this.undoButton.disabled = false;
        }else{
            this.undoButton.disabled = true;
        }
    }
    #getMouse = (e)=>{
        const rect = this.canvas.getBoundingClientRect();
        return[
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ];
    }

}