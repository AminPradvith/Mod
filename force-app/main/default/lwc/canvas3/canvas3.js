import { LightningElement, api, wire } from 'lwc';
import getFilesByRecordId from '@salesforce/apex/FileController.getFilesByRecordId';
import getFileContent from '@salesforce/apex/FileController.getFileContent';


export default class ImageMarkup extends LightningElement {
    @api recordId;
    @api treatmentType;

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
    fileList = [];
    selectedFileContent = '';

    @wire(getFilesByRecordId, { recordId: '$recordId' })
    wiredFiles({ error, data }) {
        if (data) {
            this.fileList = data.map(item => {
                return { label: item.ContentDocument.Title, value: item.ContentDocumentId };
            });
        } else if (error) {
            console.error(error);
        }
    }

    handleFileChange(event) {
        const fileId = event.target.value;
        getFileContent({ contentDocumentId: fileId })
            .then(result => {
                this.selectedFileContent = result;
                this.loadImage(result);
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadImage(imageUrl) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = this.handleImageLoad.bind(this);
    }

    renderedCallback() {
        if (!this.imageCanvas) {
            this.imageCanvas = this.template.querySelector('.image-canvas');
            this.markupCanvas = this.template.querySelector('.markup-canvas');
        }
    }

    handleImageLoad(event) {
        const image = event.target;
        this.imageCanvas.width = image.width;
        this.imageCanvas.height = image.height;
        this.imageCtx = this.imageCanvas.getContext('2d');
        this.imageCtx.drawImage(image, 0, 0);

        this.markupCanvas.width = image.width;
        this.markupCanvas.height = image.height;
        this.markupCtx = this.markupCanvas.getContext('2d');

        this.addCanvasEventListeners();
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
        const x = event.offsetX;
        const y = event.offsetY;

        if (this.activeTool === 'pen') {
            this.markupCtx.strokeStyle = this.penColor;
            this.markupCtx.lineWidth = 2;
            this.markupCtx.lineJoin = 'round';
            this.markupCtx.lineCap = 'round';
            this.markupCtx.beginPath();
            this.markupCtx.moveTo(this.lastX, this.lastY);
            this.markupCtx.lineTo(x, y);
            this.markupCtx.stroke();
            this.markupCtx.closePath();
            this.lastX = x;
            this.lastY = y;
        } else if (this.activeTool === 'eraser') {
            this.markupCtx.clearRect(x, y, 10, 10);
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
            this.createTextInput(event.offsetX, event.offsetY);
        } else if (this.activeTool === 'date') {
            this.stampDate(event.offsetX, event.offsetY);
        } else if (this.activeTool === 'numberStamp') {
            this.stampNumber(event.offsetX, event.offsetY);
        }
    }

    createTextInput(x, y) {
        this.clearTextInput();
        this.textInput = document.createElement('input');
        this.textInput.type = 'text';
        this.textInput.style.position = 'absolute';
        this.textInput.style.left = `${x}px`;
        this.textInput.style.top = `${y}px`;
        this.textInput.style.color = this.penColor;
        this.textInput.style.border = '1px solid #000';
        this.textInput.style.backgroundColor = 'transparent';
        this.textInput.addEventListener('keydown', this.handleTextInputKeyDown.bind(this));
        this.textInput.addEventListener('blur', this.handleTextInputBlur.bind(this));
        this.template.querySelector('.canvas-container').appendChild(this.textInput);
        this.textInput.focus();
    }

    clearTextInput() {
        if (this.textInput) {
            this.textInput.remove();
            this.textInput = null;
        }
    }

    handleTextInputKeyDown(event) {
        if (event.key === 'Enter') {
            this.stampText(event.target.value, parseInt(event.target.style.left), parseInt(event.target.style.top));
            this.clearTextInput();
        }
    }

    handleTextInputBlur(event) {
        this.stampText(event.target.value, parseInt(event.target.style.left), parseInt(event.target.style.top));
        this.clearTextInput();
    }

    stampText(text, x, y) {
        this.markupCtx.font = '16px Arial';
        this.markupCtx.fillStyle = this.penColor;
        this.markupCtx.fillText(text, x, y);
    }

    stampDate(x, y) {
        const currentDate = new Date().toLocaleDateString();
        this.markupCtx.font = '16px Arial';
        this.markupCtx.fillStyle = this.penColor;
        this.markupCtx.fillText(currentDate, x, y);
    }

    stampNumber(x, y) {
        this.markupCtx.font = '16px Arial';
        this.markupCtx.fillStyle = this.penColor;
        this.markupCtx.fillText(this.selectedNumber, x, y);
    }

    async saveMarkup() {
        const dataUrl = this.markupCanvas.toDataURL();
        try {
            const result = await saveImageToSalesforce({ base64ImageData: dataUrl, recordId: this.recordId });
            console.log('Image saved successfully:', result);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }

    zoomIn() {
        this.scale += this.scaleStep;
        this.updateCanvasTransform();
    }

    zoomOut() {
        this.scale -= this.scaleStep;
        this.updateCanvasTransform();
    }

    updateCanvasTransform() {
        this.markupCanvas.style.transform = `scale(${this.scale})`;
    }

    handleNumberChange(event) {
        this.selectedNumber = event.target.value;
    }
}