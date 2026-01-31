const app = {
    state: {
        activeTab: 'dashboard',
        santri: [
            { id: 1, name: 'Ahmad Fulan', level: 'Iqro 4', page: '20' },
            { id: 2, name: 'Siti Aisyah', level: 'Juz 30', page: 'An-Naba' },
            { id: 3, name: 'Umar Abdullah', level: 'Iqro 2', page: '15' },
            { id: 4, name: 'Fatimah Az-Zahra', level: 'Juz 29', page: 'Al-Mulk' },
            { id: 5, name: 'Khalid bin Walid', level: 'Iqro 6', page: '5' }
        ]
    },

    init: function() {
        this.setupNavigation();
        this.renderSantriList();
        this.setupForms();
        console.log('App Initialized');
    },

    setupNavigation: function() {
        const buttons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.page-section');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab');
                
                // Update Buttons
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Sections
                sections.forEach(s => s.style.display = 'none');
                document.getElementById(targetId).style.display = 'block';

                // Specific Action for Santri Tab
                if(targetId === 'santri') {
                    this.renderSantriList();
                }
            });
        });
    },

    renderSantriList: function() {
        const listContainer = document.getElementById('santri-list');
        listContainer.innerHTML = '';

        this.state.santri.forEach(s => {
            const card = document.createElement('div');
            card.className = 'activity-item'; // Reusing style
            card.style.marginBottom = '12px';
            card.innerHTML = `
                <div class="act-details">
                    <h4>${s.name}</h4>
                    <p>${s.level} - ${s.page}</p>
                </div>
                <div class="act-icon" style="background: transparent; color: var(--text-muted);">
                   <i class="fa-solid fa-chevron-right"></i>
                </div>
            `;
            listContainer.appendChild(card);
        });
    },

    showModal: function(modalId) {
        document.getElementById('modal-overlay').classList.add('active');
    },

    closeModal: function() {
        document.getElementById('modal-overlay').classList.remove('active');
    },

    setupForms: function() {
        document.getElementById('hafalan-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API Call
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Menyimpan...';
            
            setTimeout(() => {
                btn.innerText = 'Berhasil!';
                btn.style.background = '#10B981';
                
                setTimeout(() => {
                    this.closeModal();
                    btn.innerText = originalText;
                    btn.style.background = '';
                    e.target.reset();
                    alert('Data hafalan berhasil disimpan!');
                }, 1000);
            }, 1000);
        });

        // Close modal on outside click
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                this.closeModal();
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
