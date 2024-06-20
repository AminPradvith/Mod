import { LightningElement, api, track } from 'lwc';
import skeleton from '@salesforce/resourceUrl/skeleton';
import LaserHairRemoval from '@salesforce/resourceUrl/LaserHairRemoval';
import Emsculpt from '@salesforce/resourceUrl/Emsculpt';
import Ipl from '@salesforce/resourceUrl/Ipl';
import Kybella from '@salesforce/resourceUrl/Kybella';
import Laseveinremoval from '@salesforce/resourceUrl/Laseveinremoval';
import MicroDermAbrasion from '@salesforce/resourceUrl/MicroDermAbrasion';
import microneedlingAndSkinPenDetails from '@salesforce/resourceUrl/microneedlingAndSkinPenDetails';
import PeelTreatment from '@salesforce/resourceUrl/PeelTreatment';
import Trusculptt from '@salesforce/resourceUrl/Trusculptt';
import sculptraProcedure from '@salesforce/resourceUrl/sculptraProcedure';

export default class ImageMarkup extends LightningElement {
    @api recordId;
    @api collectionData;

    @track images = [];

    imageCanvases = [];
    markupCanvases = [];
    ctxs = [];
    activeTool = null;
    penColor = '#000000';
    selectedNumber = '1';
    scale = 1;
    scaleStep = 0.1;

   connectedCallback() {
        this.collectionData.forEach((name, index) => {
            this.images.push({
                name: name,
                url: `/path/to/images/${name}.jpg`, // Adjust URL formation as needed
            });
        });
    }

    renderedCallback() {
        if (this.images.length > 0 && this.imageCanvases.length === 0) {
            this.initializeCanvases();
        }
    }

    setImages() {
        const treatmentImages = {
            'Dermal Filler': skeleton,
            'Dermalplanning': LaserHairRemoval,
            'Botox/Dysport': LaserHairRemoval,
            'Emsculpt': Emsculpt,
            'Facial': LaserHairRemoval,
            'Fractional Laser': skeleton,
            'Hydrafacial': LaserHairRemoval,
            'Kybella': Kybella,
            'IPL': Ipl,
            'Laser Hair Removal': LaserHairRemoval,
            'Laser Vein Removal': Laseveinremoval,
            'Microdermalabrasion': MicroDermAbrasion,
            'Sculptra Body': sculptraProcedure,
            'SkinPen Microneedling': microneedlingAndSkinPenDetails,
            'Tattoo Removal': LaserHairRemoval,
            'TruSculpt': Trusculptt,
            'Vanquish': LaserHairRemoval,
            'Weight Loss Injections': LaserHairRemoval,
            'PeelTreatment': PeelTreatment,
        };

        this.images = this.collectionData.map(treatment => ({
            treatment,
            url: treatmentImages[treatment] || LaserHairRemoval
        }));
    }

    initializeCanvases() {
        this.imageCanvases = this.template.querySelectorAll('.image-canvas');
        this.markupCanvases = this.template.querySelectorAll('.markup-canvas');

        this.images.forEach((imageData, index) => {
            const imageCanvas = this.imageCanvases[index];
            const markupCanvas = this.markupCanvases[index];
            const image = new Image();
            image.src = imageData.url;

            image.onload = () => {
                imageCanvas.width = image.width;
                imageCanvas.height = image.height;
                const imageCtx = imageCanvas.getContext('2d');
                imageCtx.drawImage(image, 0, 0);

                markupCanvas.width = image.width;
                markupCanvas.height = image.height;
                const markupCtx = markupCanvas.getContext('2d');
                this.ctxs[index] = { imageCtx, markupCtx };

                this.addCanvasEventListeners(index);
            };
        });
    }

    addCanvasEventListeners(index) {
        const markupCanvas = this.markupCanvases[index];
        markupCanvas.addEventListener('mousedown', (event) => this.startDrawing(event, index));
        markupCanvas.addEventListener('mousemove', (event) => this.drawOrErase(event, index));
        markupCanvas.addEventListener('mouseup', () => this.stopDrawing(index));
        markupCanvas.addEventListener('mouseout', () => this.stopDrawing(index));
        markupCanvas.addEventListener('click', (event) => this.handleCanvasClick(event, index));
    }

    toggleToolMode(event) {
        const tool = event.currentTarget.dataset.tool;
        this.activeTool = this.activeTool === tool ? null : tool;
        this.updateButtonStates();
    }

    updateButtonStates() {
        const buttons = this.template.querySelectorAll('[data-tool]');
        buttons.forEach(button => {
            button.classList.toggle('active', button.dataset.tool === this.activeTool);
        });
    }

    handleColorChange(event) {
        this.penColor = event.target.value;
    }

    openColorPicker(event) {
        const colorPicker = event.currentTarget.querySelector('.color-picker');
        colorPicker.click();
    }

    startDrawing(event, index) {
        if (!['pen', 'eraser', 'line'].includes(this.activeTool)) return;
        const ctx = this.ctxs[index];
        this.isDrawing = true;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;

        if (this.activeTool === 'line') {
            this.startX = event.offsetX;
            this.startY = event.offsetY;
        }
    }

    drawOrErase(event, index) {
        if (!this.isDrawing) return;
        const ctx = this.ctxs[index].markupCtx;

        if (this.activeTool === 'pen') {
            ctx.strokeStyle = this.penColor;
            ctx.lineWidth = 2;
            ctx.globalCompositeOperation = 'source-over';

            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();

            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        } else if (this.activeTool === 'eraser') {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 10;
            ctx.globalCompositeOperation = 'destination-out';

            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();

            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        }
    }

    stopDrawing(index) {
        if (this.activeTool === 'line' && this.isDrawing) {
            const ctx = this.ctxs[index].markupCtx;
            ctx.strokeStyle = this.penColor;
            ctx.lineWidth = 2;
            ctx.globalCompositeOperation = 'source-over';

            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.lastX, this.lastY);
            ctx.stroke();
        }
        this.isDrawing = false;
    }

    handleCanvasClick(event, index) {
        if (this.activeTool === 'text') {
            this.addTextBox(event.offsetX, event.offsetY, index);
        }
    }

    addTextBox(x, y, index) {
        const markupCanvas = this.markupCanvases[index];
        const input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
        input.style.border = '1px solid black';
        input.style.fontSize = '14px';

        input.addEventListener('blur', () => {
            this.drawText(input.value, x, y, index);
            markupCanvas.parentNode.removeChild(input);
        });

        markupCanvas.parentNode.appendChild(input);
        input.focus();
    }

    drawText(text, x, y, index) {
        const ctx = this.ctxs[index].markupCtx;
        ctx.fillStyle = this.penColor;
        ctx.font = '14px Arial';
        ctx.fillText(text, x, y);
    }

    zoomIn() {
        this.scale += this.scaleStep;
        this.applyZoom();
    }

    zoomOut() {
        if (this.scale > this.scaleStep) {
            this.scale -= this.scaleStep;
        }
        this.applyZoom();
    }

    applyZoom() {
        this.imageCanvases.forEach((canvas, index) => {
            const image = new Image();
            image.src = this.images[index].url;
            image.onload = () => {
                canvas.width = image.width * this.scale;
                canvas.height = image.height * this.scale;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                const markupCanvas = this.markupCanvases[index];
                markupCanvas.width = canvas.width;
                markupCanvas.height = canvas.height;
            };
        });
    }

    handleNumberChange(event) {
        this.selectedNumber = event.target.value;
    }

    saveImage() {
        console.log('i am in save Image ');
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = this.imageCanvas.width;
        finalCanvas.height = this.imageCanvas.height;
        const finalCtx = finalCanvas.getContext('2d');

        finalCtx.drawImage(this.imageCanvas, 0, 0);
        finalCtx.drawImage(this.markupCanvas, 0, 0);

        const link = document.createElement('a');
        link.href = finalCanvas.toDataURL('image/png');
        link.download = 'annotated_image.png';
        link.click();
    }
}