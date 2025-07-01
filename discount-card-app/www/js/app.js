/**
 * Discount Card Application
 * A mobile app for storing and managing discount cards with QR codes
 */

class DiscountCardApp {
    constructor() {
        this.cards = [];
        this.currentView = 'main';
        this.editingCardId = null;
        this.scanner = null;
        this.isScanning = false;
        
        // Initialize app when device is ready
        document.addEventListener('deviceready', this.init.bind(this));
    }

    init() {
        console.log('Device ready - initializing app');
        this.loadCards();
        this.setupEventListeners();
        this.showView('main');
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('addCardBtn').addEventListener('click', () => this.showAddCard());
        document.getElementById('addFirstCardBtn').addEventListener('click', () => this.showAddCard());
        document.getElementById('cancelBtn').addEventListener('click', () => this.showView('main'));
        document.getElementById('backToListBtn').addEventListener('click', () => this.showView('main'));

        // Form submission
        document.getElementById('cardForm').addEventListener('submit', (e) => this.saveCard(e));

        // QR Code buttons
        document.getElementById('scanQRBtn').addEventListener('click', () => this.showQRScanner());
        document.getElementById('manualQRBtn').addEventListener('click', () => this.toggleManualQR());
        
        // Scanner buttons
        document.getElementById('startScanBtn').addEventListener('click', () => this.startQRScan());
        document.getElementById('stopScanBtn').addEventListener('click', () => this.stopQRScan());
        document.getElementById('cancelScanBtn').addEventListener('click', () => this.showAddCard());

        // Card actions
        document.getElementById('editCardBtn').addEventListener('click', () => this.editCurrentCard());
        document.getElementById('deleteCardBtn').addEventListener('click', () => this.deleteCurrentCard());
    }

    showView(viewName) {
        // Hide all views
        document.getElementById('mainView').style.display = 'none';
        document.getElementById('cardFormView').style.display = 'none';
        document.getElementById('scannerView').style.display = 'none';
        document.getElementById('cardDetailView').style.display = 'none';

        // Show requested view
        switch(viewName) {
            case 'main':
                document.getElementById('mainView').style.display = 'block';
                this.renderCardsList();
                break;
            case 'form':
                document.getElementById('cardFormView').style.display = 'block';
                break;
            case 'scanner':
                document.getElementById('scannerView').style.display = 'block';
                break;
            case 'detail':
                document.getElementById('cardDetailView').style.display = 'block';
                break;
        }
        
        this.currentView = viewName;
    }

    showAddCard() {
        this.editingCardId = null;
        document.getElementById('formTitle').textContent = 'Add New Card';
        document.getElementById('cardForm').reset();
        document.getElementById('qrData').style.display = 'none';
        this.showView('form');
    }

    showEditCard(cardId) {
        this.editingCardId = cardId;
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        document.getElementById('formTitle').textContent = 'Edit Card';
        document.getElementById('cardName').value = card.name;
        document.getElementById('cardNumber').value = card.number || '';
        document.getElementById('cardColor').value = card.color;
        document.getElementById('qrData').value = card.qrData || '';
        document.getElementById('qrData').style.display = card.qrData ? 'block' : 'none';
        
        this.showView('form');
    }

    showCardDetail(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        this.currentCardId = cardId;
        document.getElementById('cardDetailName').innerHTML = `<i class="bi bi-credit-card"></i> ${card.name}`;
        document.getElementById('cardDetailNumber').textContent = card.number || 'N/A';
        document.getElementById('cardDetailDate').textContent = new Date(card.createdAt).toLocaleDateString();

        // Generate and display QR code
        if (card.qrData) {
            this.generateQRCode(card.qrData);
        } else if (card.number) {
            this.generateQRCode(card.number);
        } else {
            this.generateQRCode(`Card: ${card.name}`);
        }

        this.showView('detail');
    }

    generateQRCode(data) {
        const canvas = document.getElementById('qrCanvas');
        QRCode.toCanvas(canvas, data, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, (error) => {
            if (error) {
                console.error('QR Code generation error:', error);
                this.showToast('Error generating QR code', 'error');
            }
        });
    }

    showQRScanner() {
        this.showView('scanner');
    }

    toggleManualQR() {
        const qrDataField = document.getElementById('qrData');
        const isVisible = qrDataField.style.display !== 'none';
        qrDataField.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            qrDataField.focus();
        }
    }

    startQRScan() {
        if (!window.QRScanner) {
            this.showToast('QR Scanner not available', 'error');
            return;
        }

        // Request camera permissions
        QRScanner.prepare((err, status) => {
            if (err) {
                console.error('QR Scanner prepare error:', err);
                this.showToast('Camera permission required', 'error');
                return;
            }

            if (status.authorized) {
                // Start scanning
                QRScanner.scan((err, text) => {
                    if (err) {
                        console.error('QR Scanner error:', err);
                        this.showToast('Scanning error', 'error');
                    } else {
                        console.log('QR Code scanned:', text);
                        this.handleQRScanResult(text);
                    }
                });

                // Show camera preview
                QRScanner.show((status) => {
                    console.log('QR Scanner show status:', status);
                    document.getElementById('qrPreview').classList.add('active');
                    document.getElementById('startScanBtn').style.display = 'none';
                    document.getElementById('stopScanBtn').style.display = 'block';
                    this.isScanning = true;
                });
            } else {
                this.showToast('Camera permission denied', 'error');
            }
        });
    }

    stopQRScan() {
        if (window.QRScanner && this.isScanning) {
            QRScanner.cancelScan(() => {
                console.log('QR scan cancelled');
            });
            
            QRScanner.hide(() => {
                console.log('QR scanner hidden');
            });

            document.getElementById('qrPreview').classList.remove('active');
            document.getElementById('startScanBtn').style.display = 'block';
            document.getElementById('stopScanBtn').style.display = 'none';
            this.isScanning = false;
        }
    }

    handleQRScanResult(text) {
        this.stopQRScan();
        document.getElementById('qrData').value = text;
        document.getElementById('qrData').style.display = 'block';
        this.showToast('QR Code scanned successfully!', 'success');
        this.showAddCard();
    }

    saveCard(event) {
        event.preventDefault();
        
        const name = document.getElementById('cardName').value.trim();
        const number = document.getElementById('cardNumber').value.trim();
        const color = document.getElementById('cardColor').value;
        const qrData = document.getElementById('qrData').value.trim();

        if (!name) {
            this.showToast('Please enter a card name', 'error');
            return;
        }

        const card = {
            id: this.editingCardId || this.generateId(),
            name: name,
            number: number,
            color: color,
            qrData: qrData,
            createdAt: this.editingCardId ? 
                this.cards.find(c => c.id === this.editingCardId).createdAt : 
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.editingCardId) {
            // Update existing card
            const index = this.cards.findIndex(c => c.id === this.editingCardId);
            if (index !== -1) {
                this.cards[index] = card;
                this.showToast('Card updated successfully!', 'success');
            }
        } else {
            // Add new card
            this.cards.push(card);
            this.showToast('Card added successfully!', 'success');
        }

        this.saveCards();
        this.showView('main');
    }

    editCurrentCard() {
        if (this.currentCardId) {
            this.showEditCard(this.currentCardId);
        }
    }

    deleteCurrentCard() {
        if (!this.currentCardId) return;

        if (confirm('Are you sure you want to delete this card?')) {
            this.cards = this.cards.filter(c => c.id !== this.currentCardId);
            this.saveCards();
            this.showToast('Card deleted successfully!', 'success');
            this.showView('main');
        }
    }

    renderCardsList() {
        const cardsList = document.getElementById('cardsList');
        const emptyState = document.getElementById('emptyState');

        if (this.cards.length === 0) {
            cardsList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        cardsList.innerHTML = this.cards.map(card => `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card discount-card card-${card.color} fade-in" onclick="app.showCardDetail('${card.id}')">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div class="card-brand text-truncate">${this.escapeHtml(card.name)}</div>
                            <i class="bi bi-qr-code fs-4"></i>
                        </div>
                        ${card.number ? `<div class="card-number">${this.escapeHtml(card.number)}</div>` : ''}
                        <div class="card-date">Added ${new Date(card.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadCards() {
        try {
            const saved = localStorage.getItem('discountCards');
            this.cards = saved ? JSON.parse(saved) : [];
            console.log('Loaded cards:', this.cards.length);
        } catch (error) {
            console.error('Error loading cards:', error);
            this.cards = [];
        }
    }

    saveCards() {
        try {
            localStorage.setItem('discountCards', JSON.stringify(this.cards));
            console.log('Cards saved:', this.cards.length);
        } catch (error) {
            console.error('Error saving cards:', error);
            this.showToast('Error saving cards', 'error');
        }
    }

    generateId() {
        return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        
        // Remove existing type classes
        toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
        
        // Add appropriate type class
        switch(type) {
            case 'success':
                toast.classList.add('bg-success', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-danger', 'text-white');
                break;
            case 'warning':
                toast.classList.add('bg-warning');
                break;
            default:
                toast.classList.add('bg-info', 'text-white');
        }

        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }
}

// Initialize app
const app = new DiscountCardApp();

// Handle back button on Android
document.addEventListener('backbutton', (e) => {
    e.preventDefault();
    
    if (app.isScanning) {
        app.stopQRScan();
        return;
    }
    
    switch(app.currentView) {
        case 'form':
        case 'detail':
        case 'scanner':
            app.showView('main');
            break;
        case 'main':
            navigator.app.exitApp();
            break;
    }
});

// Demo data for testing
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Add some demo cards for testing
    setTimeout(() => {
        if (app.cards.length === 0) {
            app.cards = [
                {
                    id: 'demo1',
                    name: 'Starbucks Rewards',
                    number: '6123456789012345',
                    color: 'success',
                    qrData: 'STARBUCKS:6123456789012345',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'demo2',
                    name: 'Target Circle',
                    number: '1234567890',
                    color: 'danger',
                    qrData: 'TARGET:1234567890',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    updatedAt: new Date(Date.now() - 172800000).toISOString()
                }
            ];
            app.saveCards();
            app.renderCardsList();
        }
    }, 1000);
}