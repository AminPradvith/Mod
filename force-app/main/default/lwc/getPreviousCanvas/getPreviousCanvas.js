import { LightningElement, api, wire } from 'lwc';
import getPngFilesForContact from '@salesforce/apex/TestImage.getPngFilesForContact';
//import saveImageToSalesforce from '@salesforce/apex/ImageUploadController.saveImageToSalesforce';
//import updateImageInSalesforce from '@salesforce/apex/ImageUploadController.updateImageInSalesforce';

export default class ImageMarkup extends LightningElement {
    @api recordId;
    @api contactId;
    images = []; // Store image URLs and contexts
    activeTool = null;
    penColor = '#000000';
    selectedNumber = '1';
    isDrawing = false;
    lastX = 0;
    lastY = 0;
    startX = 0;
    startY = 0;
    scale = 1;
    scaleStep = 0.1; 
    textInput = null;

    @wire(getPngFilesForContact, { contactId: '$contactId' })
    wiredPngFiles({ error, data }) {
        if (data && data.length > 0) {
            console.log('this.data',this.data);
            this.images = data.map((doc) => ({
                id: doc.Id,
                url: `/sfc/servlet.shepherd/document/download/${doc.Id}`,
                imageCtx: null,
                markupCtx: null,
                // Track changes
            }));
            this.loadImages();
        } else if (error) {
            console.error('Error fetching PNG files: ', error);
        }
    }

    renderedCallback() {
        if (this.images.length > 0) {
            this.images.forEach((image) => {
                image.imageCanvas = this.template.querySelector(`.image-canvas[data-id="${image.id}"]`);
                image.markupCanvas = this.template.querySelector(`.markup-canvas[data-id="${image.id}"]`);
            });
        }
    }

    loadImages() {
        this.images.forEach((image) => {
            const img = new Image();
            img.src = image.url;
            img.onload = (event) => this.handleImageLoad(event, image);
        });
    }

    handleImageLoad(event, image) {
        const img = event.target;
        image.imageCanvas.width = img.width;
        image.imageCanvas.height = img.height;
        image.imageCtx = image.imageCanvas.getContext('2d');
        image.imageCtx.drawImage(img, 0, 0);

        image.markupCanvas.width = img.width;
        image.markupCanvas.height = img.height;
        image.markupCtx = image.markupCanvas.getContext('2d');

        this.addCanvasEventListeners(image);
    }

    addCanvasEventListeners(image) {
        image.markupCanvas.addEventListener('mousedown', this.startDrawing.bind(this, image));
        image.markupCanvas.addEventListener('mousemove', this.drawOrErase.bind(this, image));
        image.markupCanvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        image.markupCanvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        image.markupCanvas.addEventListener('click', this.handleCanvasClick.bind(this, image));
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

    startDrawing(image, event) {
        if (!['pen', 'eraser', 'line'].includes(this.activeTool)) return;
        this.isDrawing = true;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;

        if (this.activeTool === 'line') {
            this.startX = event.offsetX;
            this.startY = event.offsetY;
        }
    }

    drawOrErase(image, event) {
        if (!this.isDrawing) return;
        const x = event.offsetX;
        const y = event.offsetY;
        image.hasChanges = true; // Mark changes

        if (this.activeTool === 'pen') {
            image.markupCtx.strokeStyle = this.penColor;
            image.markupCtx.lineWidth = 2;
            image.markupCtx.lineJoin = 'round';
            image.markupCtx.lineCap = 'round';
            image.markupCtx.beginPath();
            image.markupCtx.moveTo(this.lastX, this.lastY);
            image.markupCtx.lineTo(x, y);
            image.markupCtx.stroke();
            image.markupCtx.closePath();
            this.lastX = x;
            this.lastY = y;
        } else if (this.activeTool === 'eraser') {
            image.markupCtx.clearRect(x, y, 10, 10);
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

    handleCanvasClick(image, event) {
        if (this.activeTool === 'text') {
            this.createTextInput(image, event.offsetX, event.offsetY);
        } else if (this.activeTool === 'date') {
            this.stampDate(image, event.offsetX, event.offsetY);
        } else if (this.activeTool === 'numberStamp') {
            this.stampNumber(image, event.offsetX, event.offsetY);
        }
    }

    createTextInput(image, x, y) {
        this.clearTextInput();
        this.textInput = document.createElement('input');
        this.textInput.type = 'text';
        this.textInput.style.position = 'absolute';
        this.textInput.style.left = `${x}px`;
        this.textInput.style.top = `${y}px`;
        this.textInput.style.color = this.penColor;
        this.textInput.style.border = '1px solid #000';
        this.textInput.style.backgroundColor = 'transparent';
        this.textInput.addEventListener('keydown', this.handleTextInputKeyDown.bind(this, image));
        this.textInput.addEventListener('blur', this.handleTextInputBlur.bind(this, image));
        this.template.querySelector(`.canvas-container[data-id="${image.id}"]`).appendChild(this.textInput);
        this.textInput.focus();
    }

    clearTextInput() {
        if (this.textInput) {
            this.textInput.remove();
            this.textInput = null;
        }
    }

    handleTextInputKeyDown(image, event) {
        if (event.key === 'Enter') {
            this.stampText(image, event.target.value, parseInt(event.target.style.left), parseInt(event.target.style.top));
            this.clearTextInput();
        }
    }

    handleTextInputBlur(image, event) {
        this.stampText(image, event.target.value, parseInt(event.target.style.left), parseInt(event.target.style.top));
        this.clearTextInput();
    }

    stampText(image, text, x, y) {
        image.markupCtx.fillStyle = this.penColor;
        image.markupCtx.font = '16px Arial';
        image.markupCtx.fillText(text, x, y);
        image.hasChanges = true; // Mark changes
    }

    stampDate(image, x, y) {
        const date = new Date().toLocaleDateString();
        image.markupCtx.fillStyle = this.penColor;
        image.markupCtx.font = '16px Arial';
        image.markupCtx.fillText(date, x, y);
        image.hasChanges = true; // Mark changes
    }

    stampNumber(image, x, y) {
        image.markupCtx.fillStyle = this.penColor;
        image.markupCtx.font = '16px Arial';
        image.markupCtx.fillText(this.selectedNumber, x, y);
        image.hasChanges = true; // Mark changes
    }

    handleNumberChange(event) {
        this.selectedNumber = event.target.value;
    }

    zoomIn() {
        this.scale += this.scaleStep;
        this.applyZoom();
    }

    zoomOut() {
        if (this.scale > this.scaleStep) {
            this.scale -= this.scaleStep;
            this.applyZoom();
        }
    }

    applyZoom() {
        const canvasContainer = this.template.querySelector('.canvas-container');
        canvasContainer.style.transform = `scale(${this.scale})`;
    }

   saveImages() {
    console.log('Starting saveImages process');
    this.images.forEach((image) => {
        if (!image.hasChanges) {
            console.log(`Skipping image with ID ${image.id} as it has no changes.`);
            return; // Only save if there are changes
        }

        console.log(`Processing image with ID ${image.id} for original and markup save.`);

        // Create a final canvas to merge image and markup
        const originalCanvas = image.imageCanvas;
        const markupCanvas = image.markupCanvas;

        // Convert to blob and then to base64
        originalCanvas.toBlob((originalBlob) => {
            const originalReader = new FileReader();
            originalReader.onloadend = () => {
                const base64OriginalImage = originalReader.result.split(',')[1];

                markupCanvas.toBlob((markupBlob) => {
                    const markupReader = new FileReader();
                    markupReader.onloadend = () => {
                        const base64MarkupImage = markupReader.result.split(',')[1];

                        // Call Apex method
                        updateImagesInSalesforce({
                            recordId: this.contactId,
                            base64OriginalImage: base64OriginalImage,
                            base64MarkupImage: base64MarkupImage,
                            documentId: image.id
                        })
                       .then(result => {
                            console.log(result);
                            if (result) {
                                console.log('Images uploaded successfully');
                                alert('Images uploaded successfully');
                            } else {
                                alert('Error uploading images');
                            }
                        })
                       .catch(error => {
                            console.error('Error uploading images:', error);
                            alert('Error uploading images');
                        });
                    };
                    markupReader.readAsDataURL(markupBlob);
                }, 'image/png');
            };
            originalReader.readAsDataURL(originalBlob);
        }, 'image/png');
    });
    console.log('Completed saveImages process');
}



}