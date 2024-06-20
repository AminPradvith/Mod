import { LightningElement, api,track } from 'lwc';
//import saveImage from '@salesforce/apex/ImageUploadController.saveImage';
import  saveImageToSalesforce  from '@salesforce/apex/ImageUploadController.saveImageToSalesforce';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ImageMarkup extends LightningElement {
    @api recordId;
 @track isLoading = false;
    imageCanvas;
    imageCtx;
    markupCanvas;
    markupCtx;
    isDrawing = false;
    activeTool = null;
    penColor = '#000000';
    textInput = null;
    selectedNumber = '1';
    startX = 0;
    startY = 0;
    scale = 1;
    scaleStep = 0.1;
      saveDisabled = false ;
    connectedCallback() {
        console.log('recordId child canvas 1;',this.recordId);
    }

    renderedCallback() {
        if (!this.imageCanvas) {
            this.imageCanvas = this.template.querySelector('.image-canvas');
            this.markupCanvas = this.template.querySelector('.markup-canvas');
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result;
                image.onload = () => {
                    this.imageCanvas.width = image.width;
                    this.imageCanvas.height = image.height;
                    this.imageCtx = this.imageCanvas.getContext('2d');
                    this.imageCtx.drawImage(image, 0, 0);

                    this.markupCanvas.width = image.width;
                    this.markupCanvas.height = image.height;
                    this.markupCtx = this.markupCanvas.getContext('2d');

                    this.addCanvasEventListeners();
                };
            };
            reader.readAsDataURL(file);
        }
    }

    addCanvasEventListeners() {
        this.markupCanvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.markupCanvas.addEventListener('mousemove', this.drawOrErase.bind(this));
        this.markupCanvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.markupCanvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        this.markupCanvas.addEventListener('click', this.handleCanvasClick.bind(this));
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

    startDrawing(event) {
        if (!['pen', 'eraser', 'line'].includes(this.activeTool)) return;
        this.isDrawing = true;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;

        if (this.activeTool === 'line') {
            this.startX = event.offsetX;
            this.startY = event.offsetY;
        }
    }

    drawOrErase(event) {
        if (!this.isDrawing) return;

        if (this.activeTool === 'pen') {
            this.markupCtx.strokeStyle = this.penColor;
            this.markupCtx.lineWidth = 2;
            this.markupCtx.globalCompositeOperation = 'source-over';

            this.markupCtx.beginPath();
            this.markupCtx.moveTo(this.lastX, this.lastY);
            this.markupCtx.lineTo(event.offsetX, event.offsetY);
            this.markupCtx.stroke();

            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        } else if (this.activeTool === 'eraser') {
            this.markupCtx.strokeStyle = 'white';
            this.markupCtx.lineWidth = 10;
            this.markupCtx.globalCompositeOperation = 'destination-out';

            this.markupCtx.beginPath();
            this.markupCtx.moveTo(this.lastX, this.lastY);
            this.markupCtx.lineTo(event.offsetX, event.offsetY);
            this.markupCtx.stroke();

            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        }
    }

    stopDrawing(event) {
        if (this.activeTool === 'line' && this.isDrawing) {
            this.markupCtx.strokeStyle = this.penColor;
            this.markupCtx.lineWidth = 2;
            this.markupCtx.globalCompositeOperation = 'source-over';

            this.markupCtx.beginPath();
            this.markupCtx.moveTo(this.startX, this.startY);
            this.markupCtx.lineTo(event.offsetX, event.offsetY);
            this.markupCtx.stroke();
        }
        this.isDrawing = false;
    }

    handleCanvasClick(event) {
        if (this.activeTool === 'text') {
            this.addTextBox(event.offsetX, event.offsetY);
        } else if (this.activeTool === 'date') {
            this.addDateStamp(event.offsetX, event.offsetY);
        } else if (this.activeTool === 'numberStamp') {
            this.addNumberStamp(event.offsetX, event.offsetY);
        }
    }

    addTextBox(x, y) {
        if (!this.textInput) {
            this.textInput = document.createElement('textarea');
            this.textInput.style.position = 'absolute';
            this.textInput.style.left = `${x}px`;
            this.textInput.style.top = `${y}px`;
            this.textInput.style.fontSize = '20px';
            this.textInput.style.color = this.penColor;
            this.textInput.style.background = 'transparent';
            this.textInput.style.border = '1px dashed #000';
            this.textInput.style.outline = 'none';
            this.textInput.style.resize = 'none';

            this.textInput.addEventListener('blur', this.handleTextInputBlur.bind(this));
            this.textInput.addEventListener('input', this.handleTextInputInput.bind(this));
            this.template.querySelector('.canvas-container').appendChild(this.textInput);
            this.textInput.focus();
        }
    }

    handleTextInputBlur() {
        this.saveText();
    }

    handleTextInputInput() {
        const ctx = this.markupCtx;
        ctx.font = '20px Arial';
        ctx.fillStyle = this.penColor;
        ctx.fillText(this.textInput.value, parseInt(this.textInput.style.left, 10), parseInt(this.textInput.style.top, 10));
    }

    saveText() {
        const ctx = this.markupCtx;
        ctx.font = '20px Arial';
        ctx.fillStyle = this.penColor;
        ctx.fillText(this.textInput.value, parseInt(this.textInput.style.left, 10), parseInt(this.textInput.style.top, 10));

        this.textInput.removeEventListener('blur', this.handleTextInputBlur.bind(this));
        this.textInput.removeEventListener('input', this.handleTextInputInput.bind(this));
        this.template.querySelector('.canvas-container').removeChild(this.textInput);
        this.textInput = null;
    }

    addDateStamp(x, y) {
        const ctx = this.markupCtx;
        const date = new Date().toLocaleDateString();
        ctx.font = '20px Arial';
        ctx.fillStyle = this.penColor;
        ctx.fillText(date, x, y);
    }

    addNumberStamp(x, y) {
        const ctx = this.markupCtx;
        ctx.font = '20px Arial';
        ctx.fillStyle = this.penColor;
        ctx.fillText(this.selectedNumber, x, y);
    }

    handleNumberChange(event) {
        this.selectedNumber = event.target.value;
    }

    zoomIn() {
        this.scale += this.scaleStep;
        this.updateCanvasScale();
    }

    zoomOut() {
        this.scale = Math.max(this.scale - this.scaleStep, this.scaleStep);
        this.updateCanvasScale();
    }

    updateCanvasScale() {
        this.imageCanvas.style.transform = `scale(${this.scale})`;
        this.markupCanvas.style.transform = `scale(${this.scale})`;
    }

    saveImage() {
        this.isLoading =true;
       const finalCanvas = document.createElement('canvas');
        finalCanvas.width = this.imageCanvas.width;
        finalCanvas.height = this.imageCanvas.height;
        const finalCtx = finalCanvas.getContext('2d');

        finalCtx.drawImage(this.imageCanvas, 0, 0);
        finalCtx.drawImage(this.markupCanvas, 0, 0);

        const dataUrl = finalCanvas.toDataURL('image/png');

        // Call Apex method
        saveImageToSalesforce({ base64Data: dataUrl, recordId: this.recordId })
            .then(result => {
                this.isLoading =false;
                console.log(result);
                if (result) {
                    this.name = result; // Set the contentDocumentId attribute
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Image uploaded successfully',
                            variant: 'success',
                        })
                    );
                    this.saveDisabled = true; // Disable the save button
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'Error uploading image',
                            variant: 'error',
                        })
                    );
                }
            })
            .catch(error => {
                    this.isLoading =false;
                console.error('Error uploading image:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error uploading image',
                        variant: 'error',
                    })
                );
            });
    }
}