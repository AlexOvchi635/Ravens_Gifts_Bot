// Telegram Web App initialization
let tg = window.Telegram.WebApp;

// IPFS image URL for loading screen
const LOADING_IMAGE_URL = 'https://white-worthwhile-nightingale-687.mypinata.cloud/ipfs/bafybeidj6oeqcf5uce76acu7j4sjhh6ii5ichyorrrhi5ldsuk63nii434';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Show initial loading screen
    showLoadingScreen('Загружаем ZarGates Подарки...', 'Подготавливаем приложение для вас');
    
    // Initialize Telegram Web App
    tg.ready();
    tg.expand();
    
    // Set theme
    if (tg.colorScheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Simulate loading time and then load app
    setTimeout(() => {
        hideLoadingScreen();
        
        // Load initial data
        loadSlangData();
        loadGiftsData();
        setupEventListeners();
        setupNavigation();
    }, 2000);
});

// Show loading screen with IPFS image
function showLoadingScreen(title, subtitle = '') {
    // Remove existing loading screen if any
    hideLoadingScreen();
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'loadingOverlay';
    
    loadingOverlay.innerHTML = `
        <img src="${LOADING_IMAGE_URL}" alt="ZarGates Loading" class="loading-image" 
             onerror="this.style.display='none'">
        <div class="loading-text">${title}</div>
        ${subtitle ? `<div class="loading-subtitle">${subtitle}</div>` : ''}
        <div class="loading-spinner"></div>
    `;
    
    document.body.appendChild(loadingOverlay);
}

// Hide loading screen
function hideLoadingScreen() {
    const existingOverlay = document.getElementById('loadingOverlay');
    if (existingOverlay) {
        existingOverlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (existingOverlay.parentNode) {
                existingOverlay.parentNode.removeChild(existingOverlay);
            }
        }, 300);
    }
}

// Show loading state in modal with IPFS image
function showModalLoading(message) {
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="loading">
            <img src="${LOADING_IMAGE_URL}" alt="Loading" class="loading-image" 
                 onerror="this.style.display='none'">
            <div class="loading-text">${message}</div>
        </div>
    `;
}

// Slang data from your file
const slangData = [
    { term: "Задание", explanation: "а не квест" },
    { term: "Награда", explanation: "а не доход" },
    { term: "Событие", explanation: "а не ивент" },
    { term: "Золото", explanation: "а не монеты" },
    { term: "Алмазы", explanation: "а не бриллианты" },
    { term: "Shares", explanation: "а не акции" },
    { term: "Дорога трофеев", explanation: "а не трофейная дорога" },
    { term: "ГиперСити", explanation: "а не Гиперсити, или Hypercity" },
    { term: "ZarGates", explanation: "а не Zargates" },
    { term: "Суммируется", explanation: "а не стакается" },
    { term: "Артефакты", explanation: "а не NFT" },
    { term: "Сияющий Ларец", explanation: "а не Сокровищница" },
    { term: "Бот-Доставщик", explanation: "а не Деливери бот" },
    { term: "Собирать", explanation: "а не клеймить" },
    { term: "Драгоценный клевер", explanation: "а не Клевер е" }
];

// Sample gifts data
const giftsData = [
    {
        id: 1,
        title: "Ежедневная награда",
        description: "Получите золото и алмазы за ежедневный вход",
        icon: "💰",
        category: "daily",
        status: "available",
        reward: "100 золота + 5 алмазов"
    },
    {
        id: 2,
        title: "Квест: Сбор артефактов",
        description: "Соберите 10 артефактов для получения награды",
        icon: "🎯",
        category: "daily",
        status: "available",
        reward: "50 алмазов + Shares"
    },
    {
        id: 3,
        title: "Реферальная программа",
        description: "Пригласите друга и получите бонус",
        icon: "👥",
        category: "referral",
        status: "available",
        reward: "200 золота + 10 алмазов"
    },
    {
        id: 4,
        title: "Сезонный билет",
        description: "Особые награды за участие в сезоне",
        icon: "🎫",
        category: "seasonal",
        status: "claimed",
        reward: "Сезонные награды"
    },
    {
        id: 5,
        title: "Специальное событие",
        description: "Участвуйте в особом событии ZarGates",
        icon: "⭐",
        category: "special",
        status: "expired",
        reward: "Эксклюзивные награды"
    }
];

// Load slang data
function loadSlangData() {
    const slangList = document.getElementById('slangList');
    if (!slangList) return;
    
    slangList.innerHTML = '';
    
    slangData.forEach(item => {
        const slangItem = document.createElement('div');
        slangItem.className = 'slang-item';
        slangItem.innerHTML = `
            <div class="slang-term">${item.term}</div>
            <div class="slang-explanation">${item.explanation}</div>
        `;
        slangList.appendChild(slangItem);
    });
}

// Load gifts data
function loadGiftsData() {
    const giftsContainer = document.getElementById('giftsContainer');
    if (!giftsContainer) return;
    
    giftsContainer.innerHTML = '';
    
    giftsData.forEach(gift => {
        const giftItem = document.createElement('div');
        giftItem.className = 'gift-item';
        giftItem.setAttribute('data-gift-id', gift.id);
        
        giftItem.innerHTML = `
            <div class="gift-icon">${gift.icon}</div>
            <div class="gift-info">
                <div class="gift-title">${gift.title}</div>
                <div class="gift-description">${gift.description}</div>
                <div class="gift-status ${gift.status}">
                    ${getStatusText(gift.status)}
                </div>
            </div>
        `;
        
        // Add click event for available gifts
        if (gift.status === 'available') {
            giftItem.addEventListener('click', () => showGiftModal(gift));
        }
        
        giftsContainer.appendChild(giftItem);
    });
}

// Get status text
function getStatusText(status) {
    switch(status) {
        case 'available': return 'Доступно';
        case 'claimed': return 'Получено';
        case 'expired': return 'Истекло';
        default: return 'Неизвестно';
    }
}

// Show gift modal
function showGiftModal(gift) {
    const modal = document.getElementById('giftModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = gift.title;
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; margin-bottom: 15px;">${gift.icon}</div>
            <h4 style="margin-bottom: 10px; color: #333;">${gift.title}</h4>
            <p style="color: #666; margin-bottom: 20px;">${gift.description}</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; border-left: 4px solid #667eea;">
                <strong>Награда:</strong> ${gift.reward}
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close gift modal
function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.classList.remove('show');
}

// Setup event listeners
function setupEventListeners() {
    // Modal close events
    document.getElementById('closeModal').addEventListener('click', closeGiftModal);
    document.getElementById('cancelGift').addEventListener('click', closeGiftModal);
    
    // Claim gift event
    document.getElementById('claimGift').addEventListener('click', claimGift);
    
    // Category card events
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterGiftsByCategory(category);
        });
    });
    
    // Modal backdrop click
    document.getElementById('giftModal').addEventListener('click', (e) => {
        if (e.target.id === 'giftModal') {
            closeGiftModal();
        }
    });
    
    // Leaderboard tab events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const period = e.target.getAttribute('data-period');
            switchLeaderboardPeriod(period, e.target);
        }
        
        // Copy referral link
        if (e.target.classList.contains('copy-btn')) {
            copyReferralLink();
        }
    });
}

// Setup navigation
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            
            // Update active nav button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide sections based on tab
            showTab(tab);
        });
    });
}

// Show specific tab
function showTab(tab) {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    switch(tab) {
        case 'referrals':
            showReferralsTab();
            break;
        case 'leaderboard':
            showLeaderboardTab();
            break;
        case 'mainmenu':
            document.querySelector('.gift-categories').style.display = 'block';
            document.querySelector('.available-gifts').style.display = 'block';
            break;
        case 'gifts':
            showGiftsTab();
            break;
        case 'profile':
            showProfileTab();
            break;
    }
}

// Show referrals tab
function showReferralsTab() {
    const mainContent = document.querySelector('.main-content');
    const referralsSection = document.createElement('section');
    referralsSection.className = 'referrals-section';
    referralsSection.innerHTML = `
        <h2>👥 Referrals</h2>
        <div class="referrals-info">
            <div class="referral-stats">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value">12</div>
                    <div class="stat-label">Total Referrals</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">2,400</div>
                    <div class="stat-label">Total Earned</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">3</div>
                    <div class="stat-label">Active Referrals</div>
                </div>
            </div>
            <div class="referral-link">
                <h3>Your Referral Link</h3>
                <div class="link-container">
                    <input type="text" value="https://t.me/ZarGatesBot?start=ref123" readonly>
                    <button class="copy-btn">Copy</button>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(referralsSection);
}

// Show leaderboard tab
function showLeaderboardTab() {
    const mainContent = document.querySelector('.main-content');
    const leaderboardSection = document.createElement('section');
    leaderboardSection.className = 'leaderboard-section';
    leaderboardSection.innerHTML = `
        <h2>🏆 Leaderboard</h2>
        <div class="leaderboard-tabs">
            <button class="tab-btn active" data-period="weekly">Weekly</button>
            <button class="tab-btn" data-period="monthly">Monthly</button>
            <button class="tab-btn" data-period="alltime">All Time</button>
        </div>
        <div class="leaderboard-list">
            <div class="leaderboard-item top-1">
                <div class="rank">🥇</div>
                <div class="player-info">
                    <div class="player-name">ZarGates_King</div>
                    <div class="player-level">Level 89</div>
                </div>
                <div class="player-score">1,250,420</div>
            </div>
            <div class="leaderboard-item top-2">
                <div class="rank">🥈</div>
                <div class="player-info">
                    <div class="player-name">CryptoQueen</div>
                    <div class="player-level">Level 76</div>
                </div>
                <div class="player-score">987,650</div>
            </div>
            <div class="leaderboard-item top-3">
                <div class="rank">🥉</div>
                <div class="player-info">
                    <div class="player-name">GamingPro</div>
                    <div class="player-level">Level 72</div>
                </div>
                <div class="player-score">856,320</div>
            </div>
            <div class="leaderboard-item">
                <div class="rank">4</div>
                <div class="player-info">
                    <div class="player-name">YourUsername</div>
                    <div class="player-level">Level 25</div>
                </div>
                <div class="player-score">15,420</div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(leaderboardSection);
}

// Show gifts tab
function showGiftsTab() {
    const mainContent = document.querySelector('.main-content');
    const giftsSection = document.createElement('section');
    giftsSection.className = 'gifts-section';
    giftsSection.innerHTML = `
        <h2>🎁 Gifts</h2>
        <div class="gifts-container" id="giftsContainer">
            <!-- Gifts will be loaded here -->
        </div>
    `;
    
    // Load gifts data for this tab
    loadGiftsData();
    mainContent.appendChild(giftsSection);
}

// Show profile tab
function showProfileTab() {
    const mainContent = document.querySelector('.main-content');
    const profileSection = document.createElement('section');
    profileSection.className = 'profile-section';
    profileSection.innerHTML = `
        <h2>👤 Profile</h2>
        <div class="profile-info">
            <div class="profile-avatar">
                <div class="avatar-placeholder">👤</div>
            </div>
            <div class="profile-details">
                <h3>ZarGates Player</h3>
                <p>Level: 25</p>
                <p>Experience: 15,420 / 20,000</p>
            </div>
        </div>
        <div class="profile-stats">
            <div class="stat-item">
                <div class="stat-icon">💰</div>
                <div class="stat-value">15,420</div>
                <div class="stat-label">Gold</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">💎</div>
                <div class="stat-value">1,250</div>
                <div class="stat-label">Diamonds</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">📈</div>
                <div class="stat-value">89</div>
                <div class="stat-label">Shares</div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(profileSection);
}

// Filter gifts by category
function filterGiftsByCategory(category) {
    const giftsContainer = document.getElementById('giftsContainer');
    
    // Show loading state with IPFS image
    giftsContainer.innerHTML = `
        <div class="loading">
            <img src="${LOADING_IMAGE_URL}" alt="Loading" class="loading-image" 
                 onerror="this.style.display='none'">
            <div class="loading-text">Загружаем подарки...</div>
        </div>
    `;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        const filteredGifts = giftsData.filter(gift => gift.category === category);
        
        giftsContainer.innerHTML = '';
        
        if (filteredGifts.length === 0) {
            giftsContainer.innerHTML = `
                <div class="loading">
                    <div class="loading-text">Нет подарков в этой категории</div>
                    <div class="loading-subtitle">Попробуйте другую категорию</div>
                </div>
            `;
            return;
        }
        
        filteredGifts.forEach(gift => {
            const giftItem = document.createElement('div');
            giftItem.className = 'gift-item';
            giftItem.setAttribute('data-gift-id', gift.id);
            
            giftItem.innerHTML = `
                <div class="gift-icon">${gift.icon}</div>
                <div class="gift-info">
                    <div class="gift-title">${gift.title}</div>
                    <div class="gift-description">${gift.description}</div>
                    <div class="gift-status ${gift.status}">
                        ${getStatusText(gift.status)}
                    </div>
                </div>
            `;
            
            if (gift.status === 'available') {
                giftItem.addEventListener('click', () => showGiftModal(gift));
            }
            
            giftsContainer.appendChild(giftItem);
        });
    }, 800);
}

// Claim gift function
function claimGift() {
    const modalBody = document.getElementById('modalBody');
    
    // Show loading state
    showModalLoading('Получаем подарок...');
    
    // Simulate API call
    setTimeout(() => {
        modalBody.innerHTML = `
            <div class="success-message">
                🎉 Подарок успешно получен! Награды добавлены в ваш аккаунт.
            </div>
        `;
        
        // Update gift status in data
        const giftId = getCurrentGiftId();
        if (giftId) {
            const gift = giftsData.find(g => g.id === giftId);
            if (gift) {
                gift.status = 'claimed';
            }
        }
        
        // Reload gifts after a delay
        setTimeout(() => {
            closeGiftModal();
            loadGiftsData();
        }, 2000);
        
    }, 1500);
}

// Get current gift ID from modal
function getCurrentGiftId() {
    const modal = document.getElementById('giftModal');
    const giftItems = document.querySelectorAll('.gift-item');
    
    for (let item of giftItems) {
        if (item.style.display !== 'none') {
            return parseInt(item.getAttribute('data-gift-id'));
        }
    }
    return null;
}

// Add profile styles
const profileStyles = `
    .profile-section {
        display: block !important;
    }
    
    .profile-info {
        display: flex;
        align-items: center;
        gap: 20px;
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        margin-bottom: 20px;
    }
    
    .profile-avatar {
        width: 80px;
        height: 80px;
    }
    
    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
    }
    
    .profile-details h3 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .profile-details p {
        color: #666;
        margin-bottom: 5px;
    }
    
    .profile-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .stat-item {
        background: white;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .stat-icon {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 5px;
    }
    
    .stat-label {
        color: #666;
        font-size: 0.9rem;
    }
`;

// Switch leaderboard period
function switchLeaderboardPeriod(period, clickedBtn) {
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    clickedBtn.classList.add('active');
    
    // Here you would typically fetch new data for the selected period
    // For now, we'll just show a loading state
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (leaderboardList) {
        leaderboardList.innerHTML = `
            <div class="loading">
                <div class="loading-text">Loading ${period} leaderboard...</div>
            </div>
        `;
        
        // Simulate loading delay
        setTimeout(() => {
            // Reload leaderboard data (you can customize this based on period)
            showLeaderboardTab();
        }, 1000);
    }
}

// Copy referral link to clipboard
function copyReferralLink() {
    const linkInput = document.querySelector('.link-container input');
    if (linkInput) {
        linkInput.select();
        linkInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            showCopySuccess();
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(linkInput.value).then(() => {
                showCopySuccess();
            }).catch(() => {
                showCopyError();
            });
        }
    }
}

// Show copy success message
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#2e7d32';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }
}

// Show copy error message
function showCopyError() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Error!';
        copyBtn.style.background = '#c62828';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }
}

// Add profile styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = profileStyles;
document.head.appendChild(styleSheet);

// Initialize with main menu tab
showTab('mainmenu');
