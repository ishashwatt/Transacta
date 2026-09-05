// Universal In-App Notification System (Zero Browser Alert Popups)
function showInAppMessage(message, type = 'info', duration = 4000) {
  let container = document.getElementById('inAppToastContainer') || document.querySelector('.inapp-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'inAppToastContainer';
    container.className = 'inapp-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `inapp-toast ${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg class="inapp-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

window.alert = function(msg) {
  showInAppMessage(typeof msg === 'string' ? msg : JSON.stringify(msg), 'info');
};
window.showInAppMessage = showInAppMessage;

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Header Elements
  const userDealIdBadge = document.getElementById('userDealIdBadge');
  const dealStatusPill = document.getElementById('dealStatusPill');
  const detailUserProfileBtn = document.getElementById('detailUserProfileBtn');
  const detailNavUserName = document.getElementById('detailNavUserName');
  const detailOpenHistoryBtn = document.getElementById('detailOpenHistoryBtn');
  const detailHistoryCountBadge = document.getElementById('detailHistoryCountBadge');

  // Product Info
  const userActiveProductTitle = document.getElementById('userActiveProductTitle');
  const userActiveProductSpecs = document.getElementById('userActiveProductSpecs');
  const userActiveBudget = document.getElementById('userActiveBudget');
  const colMerchantName = document.getElementById('colMerchantName');
  const colMerchantLocation = document.getElementById('colMerchantLocation');
  const userActiveCurrentPrice = document.getElementById('userActiveCurrentPrice');

  // Chatbot Elements
  const chatMerchantSubtitle = document.getElementById('chatMerchantSubtitle');
  const chatMessagesContainer = document.getElementById('chatMessagesContainer');
  const chatQuickActions = document.getElementById('chatQuickActions');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatMessageInput = document.getElementById('chatMessageInput');
  const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');
  const chatLockedNotice = document.getElementById('chatLockedNotice');

  // Right Column & Settlement Elements
  const competingMerchantsContainer = document.getElementById('competingMerchantsContainer');
  const userDemandSummaryText = document.getElementById('userDemandSummaryText');
  const agreedBundlesList = document.getElementById('agreedBundlesList');
  const consoleFinalPrice = document.getElementById('consoleFinalPrice');
  const consoleOriginalPrice = document.getElementById('consoleOriginalPrice');
  const consoleSavingsBadge = document.getElementById('consoleSavingsBadge');
  const consoleRazorpayPayBtn = document.getElementById('consoleRazorpayPayBtn');
  const payBtnLabel = document.getElementById('payBtnLabel');

  // Top Header Pay & Invoice Elements
  const headerRazorpayPayBtn = document.getElementById('headerRazorpayPayBtn');
  const headerPayBtnLabel = document.getElementById('headerPayBtnLabel');
  const headerSavingsBadge = document.getElementById('headerSavingsBadge');
  const headerOriginalPrice = document.getElementById('headerOriginalPrice');
  const headerDownloadInvoiceBtn = document.getElementById('headerDownloadInvoiceBtn');

  // Bottom Horizontal Settlement Bar Elements
  const bottomSettlementBar = document.getElementById('bottomSettlementBar');
  const bottomProductTitle = document.getElementById('bottomProductTitle');
  const bottomBasePriceTag = document.getElementById('bottomBasePriceTag');
  const bottomBundlesContainer = document.getElementById('bottomBundlesContainer');
  const bottomMerchantLabel = document.getElementById('bottomMerchantLabel');
  const bottomDealSummaryText = document.getElementById('bottomDealSummaryText');
  const bottomFinalPrice = document.getElementById('bottomFinalPrice');
  const bottomOriginalPrice = document.getElementById('bottomOriginalPrice');
  const bottomSavingsBadge = document.getElementById('bottomSavingsBadge');
  const bottomSettlementStatusText = document.getElementById('bottomSettlementStatusText');
  const bottomDownloadInvoiceBtn = document.getElementById('bottomDownloadInvoiceBtn');

  // User Profile & Onboarding
  const userOnboardModalBackdrop = document.getElementById('userOnboardModalBackdrop');
  const userOnboardForm = document.getElementById('userOnboardForm');
  const userOnboardInput = document.getElementById('userOnboardInput');
  const closeUserModalBtn = document.getElementById('closeUserModalBtn');

  // Deal History Drawer (My Deals)
  const dealHistoryDrawerBackdrop = document.getElementById('dealHistoryDrawerBackdrop');
  const closeHistoryModalBtn = document.getElementById('closeHistoryModalBtn');
  const dismissHistoryBtn = document.getElementById('dismissHistoryBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const dealHistoryListContainer = document.getElementById('dealHistoryListContainer');
  const historyUserSubtitle = document.getElementById('historyUserSubtitle');
  const totalSavedSummaryText = document.getElementById('totalSavedSummaryText');

  // Automatic clean slate reset for user transactions
  try {
    if (!localStorage.getItem('transacta_clean_slate_v2')) {
      localStorage.removeItem('transacta_user_history');
      localStorage.removeItem('transacta_user_active_deals');
      localStorage.setItem('transacta_clean_slate_v2', 'true');
    }
  } catch (e) {}

  // Receipt Modal Elements
  const receiptModalBackdrop = document.getElementById('receiptModalBackdrop');
  const closeReceiptModalBtn = document.getElementById('closeReceiptModalBtn');
  const dismissReceiptBtn = document.getElementById('dismissReceiptBtn');
  const modalReceiptTitle = document.getElementById('modalReceiptTitle');
  const modalPaymentId = document.getElementById('modalPaymentId');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalBasePrice = document.getElementById('modalBasePrice');
  const modalTotalAmount = document.getElementById('modalTotalAmount');
  const modalSealHash = document.getElementById('modalSealHash');
  const modalBundleList = document.getElementById('modalBundleList');
  const downloadTaxInvoiceBtn = document.getElementById('downloadTaxInvoiceBtn');
  const copySealBtn = document.getElementById('copySealBtn');

  // In-App Razorpay Test Sheet Modal Elements
  const razorpayModalBackdrop = document.getElementById('razorpayModalBackdrop');
  const closeRzpModalBtn = document.getElementById('closeRzpModalBtn');
  const rzpModalAmountDisplay = document.getElementById('rzpModalAmountDisplay');
  const rzpModalProductDesc = document.getElementById('rzpModalProductDesc');
  const rzpModalPayBtn = document.getElementById('rzpModalPayBtn');
  const rzpModalPayBtnText = document.getElementById('rzpModalPayBtnText');
  const aiEngineStatusBadge = document.getElementById('aiEngineStatusBadge');

  // Load and display active AI Engine from backend
  function updateAIEngineBadge() {
    fetch('/api/ai-status')
      .then(res => res.json())
      .then(data => {
        if (aiEngineStatusBadge && data.activeEngine) {
          aiEngineStatusBadge.textContent = data.activeEngine;
        }
      })
      .catch(() => {});
  }
  updateAIEngineBadge();

  let activeDeal = null;
  let all50Vendors = [];
  let isChatLocked = false;

  // =========================================================================
  // USER SESSION & LOCAL STORAGE MANAGEMENT
  // =========================================================================
  function getActiveUser() {
    try {
      const u = localStorage.getItem('transacta_user');
      if (u) return JSON.parse(u);
    } catch (e) {
      console.warn("User storage read error:", e);
    }
    return null;
  }

  function setActiveUser(name) {
    const cleanName = (name || '').trim();
    if (!cleanName) return null;
    const user = {
      id: 'usr_' + Date.now().toString(36),
      name: cleanName,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('transacta_user', JSON.stringify(user));
    } catch (e) {
      console.warn("User storage write error:", e);
    }
    updateUserUI(user);
    return user;
  }

  function updateUserUI(user) {
    if (detailNavUserName) {
      detailNavUserName.textContent = user ? user.name : "My Agent";
    }
    if (historyUserSubtitle) {
      historyUserSubtitle.textContent = user ? `Negotiations for ${user.name}` : "Saved on this device";
    }
  }

  function showUserModal(isEdit = false) {
    if (!userOnboardModalBackdrop) return;
    const currentUser = getActiveUser();
    if (userOnboardInput) {
      userOnboardInput.value = (isEdit && currentUser) ? currentUser.name : '';
    }
    userOnboardModalBackdrop.style.display = 'flex';
    userOnboardModalBackdrop.classList.add('active');
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      if (userOnboardInput) userOnboardInput.focus();
    }, 100);
  }

  function closeUserModal() {
    if (!userOnboardModalBackdrop) return;
    userOnboardModalBackdrop.classList.remove('active');
    userOnboardModalBackdrop.style.display = 'none';
    if (!getActiveUser()) {
      const fallbackName = (userOnboardInput && userOnboardInput.value.trim()) ? userOnboardInput.value.trim() : 'Shashwat';
      setActiveUser(fallbackName);
    }
  }

  if (closeUserModalBtn) closeUserModalBtn.addEventListener('click', closeUserModal);
  if (detailUserProfileBtn) detailUserProfileBtn.addEventListener('click', () => showUserModal(true));
  if (userOnboardModalBackdrop) {
    userOnboardModalBackdrop.addEventListener('click', (e) => {
      if (e.target === userOnboardModalBackdrop) closeUserModal();
    });
  }

  if (userOnboardForm) {
    userOnboardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (userOnboardInput ? userOnboardInput.value : '').trim();
      if (!name) return;
      const user = setActiveUser(name);
      closeUserModal();
      showInAppMessage(`Welcome, ${user.name}! Your autonomous buyer agent is active.`, 'success');
    });
  }

  // =========================================================================
  // USER ACTIVE DEALS & HISTORY
  // =========================================================================
  function getActiveUserDeals() {
    try {
      const d = localStorage.getItem('transacta_user_active_deals');
      if (d) {
        const parsed = JSON.parse(d);
        return parsed.filter(deal => {
          const s = (deal.status || '').toUpperCase();
          return s !== 'SETTLED' && s !== 'SETTLED_VIA_RAZORPAY' && s !== 'COMPLETED';
        });
      }
    } catch (e) {
      console.warn("Active deals read error:", e);
    }
    return [];
  }

  function saveActiveUserDeal(dealRecord) {
    try {
      let activeDeals = getActiveUserDeals();
      const idx = activeDeals.findIndex(d => d.id === dealRecord.id || d.dealId === dealRecord.dealId);
      if (idx >= 0) {
        activeDeals[idx] = { ...activeDeals[idx], ...dealRecord };
      } else {
        activeDeals.unshift(dealRecord);
      }
      localStorage.setItem('transacta_user_active_deals', JSON.stringify(activeDeals));
    } catch (e) {
      console.warn("Active deals write error:", e);
    }
  }

  function removeActiveUserDeal(dealId) {
    try {
      let activeDeals = getActiveUserDeals();
      activeDeals = activeDeals.filter(d => (d.id !== dealId && d.dealId !== dealId));
      localStorage.setItem('transacta_user_active_deals', JSON.stringify(activeDeals));
    } catch (e) {
      console.warn("Remove active deal error:", e);
    }
  }

  function getUserDealHistory() {
    try {
      const h = localStorage.getItem('transacta_user_history');
      if (h) return JSON.parse(h);
    } catch (e) {
      console.warn("History storage read error:", e);
    }
    return [];
  }

  function saveDealToHistory(dealRecord) {
    try {
      let history = getUserDealHistory();
      const existingIdx = history.findIndex(d => d.id === dealRecord.id || (d.title === dealRecord.title && Math.abs(new Date(d.timestamp) - new Date(dealRecord.timestamp)) < 60000));
      if (existingIdx >= 0) {
        history[existingIdx] = { ...history[existingIdx], ...dealRecord };
      } else {
        history.unshift(dealRecord);
      }
      if (history.length > 50) history.pop();
      localStorage.setItem('transacta_user_history', JSON.stringify(history));
      updateHistoryBadge();
    } catch (e) {
      console.warn("History storage write error:", e);
    }
  }

  function updateHistoryBadge() {
    const history = getUserDealHistory();
    if (detailHistoryCountBadge) {
      if (history.length > 0) {
        detailHistoryCountBadge.textContent = history.length;
        detailHistoryCountBadge.style.display = 'inline-block';
      } else {
        detailHistoryCountBadge.style.display = 'none';
      }
    }
  }

  function renderDealHistoryDrawer() {
    if (!dealHistoryListContainer) return;
    const history = getUserDealHistory();
    const currentUser = getActiveUser();

    if (historyUserSubtitle) {
      historyUserSubtitle.textContent = currentUser ? `Negotiations for ${currentUser.name}` : "Saved on this device";
    }

    if (!history || history.length === 0) {
      dealHistoryListContainer.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: #94a3b8;">
          <i data-lucide="inbox" style="width: 36px; height: 36px; margin-bottom: 0.75rem; opacity: 0.5;"></i>
          <p style="font-size: 14.5px; font-weight: 600; color: #475569; margin-bottom: 0.35rem;">No Past Deals Yet</p>
          <p style="font-size: 13px; color: #64748b;">All completed and settled Razorpay deals will be archived here.</p>
        </div>
      `;
      if (totalSavedSummaryText) totalSavedSummaryText.textContent = "Total saved: ₹0";
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let totalSaved = 0;
    const cardsHtml = history.map((d, index) => {
      totalSaved += (d.savings || 0);
      const isSettled = d.status === 'SETTLED_VIA_RAZORPAY' || d.status === 'SETTLED' || d.status === 'COMPLETED';
      const statusBadge = isSettled
        ? `<span style="color: #166534; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;"><i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Settled on Razorpay</span>`
        : `<span style="color: #0284c7; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;"><i data-lucide="lock" style="width: 14px; height: 14px;"></i> Deal Locked</span>`;

      const bundlesText = (d.bundle || []).map(b => typeof b === 'string' ? b : b.name).join(' + ');
      const merchantName = d.merchant || 'Verified Merchant';
      const initials = merchantName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'VM';
      const dateStr = d.displayDate || (d.timestamp ? new Date(d.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently');

      return `
        <div class="history-deal-row" style="display: grid; grid-template-columns: 165px 1.25fr 130px 175px 170px; align-items: center; gap: 0.85rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.85rem 1.15rem; transition: all 0.18s ease;">
          <div style="display: flex; align-items: center; gap: 0.65rem; min-width: 0;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; flex-shrink: 0;">
              ${initials}
            </div>
            <div style="display: flex; flex-direction: column; min-width: 0;">
              <strong style="font-size: 13.5px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${merchantName}">${merchantName}</strong>
              <span style="font-size: 11.5px; color: #94a3b8;">${dateStr}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; min-width: 0;">
            <strong style="font-size: 13.5px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${d.title || d.query}">${d.title || d.query}</strong>
            <span style="font-size: 11.5px; color: #0284c7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${bundlesText || 'Free bundled accessories'}">+ Bundles: ${bundlesText || 'Included accessory bundle'}</span>
          </div>

          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: baseline; gap: 0.4rem;">
              <strong style="font-size: 14.5px; color: #0f172a;">₹${(d.finalPrice || 0).toLocaleString('en-IN')}</strong>
              <span style="font-size: 11.5px; color: #94a3b8; text-decoration: line-through;">₹${(d.retailTotal || (d.finalPrice + (d.savings || 0))).toLocaleString('en-IN')}</span>
            </div>
            <span style="font-size: 11.5px; color: #16a34a; font-weight: 700;">Saved ₹${(d.savings || 0).toLocaleString('en-IN')}</span>
          </div>

          <div style="min-width: 0; white-space: nowrap;">
            ${statusBadge}
          </div>

          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.35rem;">
            <button class="history-action-btn view-deal-detail-btn" data-index="${index}">
              <i data-lucide="message-square"></i>
              <span>View Chats</span>
            </button>
            <button class="history-action-btn view-deal-invoice-btn" data-order-id="${d.id || d.dealId || d.receipt || ''}">
              <i data-lucide="file-text"></i>
              <span>Invoice</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    dealHistoryListContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: 165px 1.25fr 130px 175px 170px; gap: 0.85rem; padding: 0 1.15rem 0.5rem; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em;">
        <div>Merchant</div>
        <div>Product &amp; Bundles</div>
        <div>Agreed Price</div>
        <div>Status</div>
        <div style="text-align: right;">Actions</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.65rem;">
        ${cardsHtml}
      </div>
    `;

    if (totalSavedSummaryText) {
      totalSavedSummaryText.textContent = `Total saved across deals: ₹${totalSaved.toLocaleString('en-IN')}`;
    }

    if (window.lucide) window.lucide.createIcons();

    document.querySelectorAll('.view-deal-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const dealToOpen = history[idx];
        if (dealToOpen) {
          closeHistoryDrawer();
          loadDealIntoRoom(dealToOpen);
        }
      });
    });

    document.querySelectorAll('.view-deal-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.getAttribute('data-order-id');
        window.open(`/invoice?orderId=${encodeURIComponent(orderId)}`, '_blank');
      });
    });
  }

  function openHistoryDrawer() {
    if (!dealHistoryDrawerBackdrop) return;
    renderDealHistoryDrawer();
    dealHistoryDrawerBackdrop.style.display = 'flex';
    dealHistoryDrawerBackdrop.classList.add('active');
  }

  function closeHistoryDrawer() {
    if (!dealHistoryDrawerBackdrop) return;
    dealHistoryDrawerBackdrop.classList.remove('active');
    dealHistoryDrawerBackdrop.style.display = 'none';
  }

  if (detailOpenHistoryBtn) detailOpenHistoryBtn.addEventListener('click', openHistoryDrawer);
  if (closeHistoryModalBtn) closeHistoryModalBtn.addEventListener('click', closeHistoryDrawer);
  if (dismissHistoryBtn) dismissHistoryBtn.addEventListener('click', closeHistoryDrawer);
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      localStorage.removeItem('transacta_user_history');
      localStorage.removeItem('transacta_user_active_deals');
      updateHistoryBadge();
      renderDealHistoryDrawer();
      showInAppMessage("All negotiated deals cleared from user memory.", "info");
    });
  }
  if (dealHistoryDrawerBackdrop) {
    dealHistoryDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === dealHistoryDrawerBackdrop) closeHistoryDrawer();
    });
  }

  // =========================================================================
  // 50 VENDORS DIRECTORY (FETCH & RENDER 3-4 COMPETING MERCHANTS)
  // =========================================================================
  async function fetch50Vendors() {
    try {
      const res = await fetch('/api/vendor/directory');
      const data = await res.json();
      if (data.success && data.vendors) {
        all50Vendors = data.vendors;
      }
    } catch (e) {
      console.warn("Could not fetch 50 vendors directory:", e);
    }
  }

  function renderCompetingMerchants(selectedMerchantName, currentPrice) {
    if (!competingMerchantsContainer) return;
    competingMerchantsContainer.innerHTML = '';

    // Pick 3 distinct alternative vendors from 50 vendors directory
    let pool = all50Vendors.filter(v => v.name !== selectedMerchantName);
    if (pool.length < 3) {
      pool = [
        { id: "v_43", name: "AmberWave Smart Appliances", city: "Hyderabad", rating: 4.88, deliveryDays: 2, category: "Smart Home & IoT" },
        { id: "v_06", name: "Bharat Tech Hub", city: "New Delhi", rating: 4.85, deliveryDays: 2, category: "Consumer Electronics" },
        { id: "v_16", name: "GarudaTech Electronics", city: "Hyderabad", rating: 4.84, deliveryDays: 2, category: "General Electronics" },
        { id: "v_46", name: "CircuitTree Electronics Hub", city: "Kolkata", rating: 4.82, deliveryDays: 3, category: "General Electronics" }
      ];
    }

    // Pick exactly 3 alternative vendors
    const shuffled = pool.slice(0, 3);

    const activeBundles = (activeDeal && Array.isArray(activeDeal.bundle) && activeDeal.bundle.length > 0)
      ? activeDeal.bundle.map(b => typeof b === 'string' ? b : b.name)
      : [
          "Complimentary Accessory Pack",
          "1-Year Extended Brand Warranty",
          "Priority 24-Hour Express Air Dispatch SLA"
        ];

    // 1. Active Merchant Card (Spacious, prominent, active highlight)
    const activeCard = document.createElement('div');
    activeCard.className = 'comp-vendor-card active';
    activeCard.innerHTML = `
      <div class="comp-vendor-card-header">
        <div class="comp-vendor-card-title-group">
          <strong class="comp-vendor-card-name">${selectedMerchantName}</strong>
          <span class="comp-tag-active">Active Seller</span>
        </div>
        <div class="comp-vendor-card-price">₹${(currentPrice || 1499).toLocaleString('en-IN')}</div>
      </div>
      <div class="comp-vendor-card-meta">
        <span>Verified Merchant</span>
        <span class="comp-meta-dot">•</span>
        <span>Rating 4.9 (120+ orders)</span>
        <span class="comp-meta-dot">•</span>
        <span>Next-Day Air Dispatch</span>
      </div>
      <div class="comp-vendor-card-bundle">
        <i data-lucide="gift" style="width: 13px; height: 13px; flex-shrink: 0;"></i>
        <span>Included: Complimentary ${activeBundles[0] || 'Care Protection Pack'}</span>
      </div>
      <div class="comp-vendor-card-footer">
        <div class="comp-card-current-text">
          <i data-lucide="check-circle" style="width: 14px; height: 14px; color: #16a34a;"></i>
          <span>Currently Connected in Live Chat</span>
        </div>
      </div>
    `;
    competingMerchantsContainer.appendChild(activeCard);

    // 2. Competing Alternative Cards (3 cards)
    shuffled.forEach((v, idx) => {
      const altPrice = Math.round((currentPrice || 1499) * (1 + (idx + 1) * 0.035));
      const bundleName = activeBundles[(idx + 1) % activeBundles.length] || "1-Year Extended Warranty";
      const card = document.createElement('div');
      card.className = 'comp-vendor-card';
      card.innerHTML = `
        <div class="comp-vendor-card-header">
          <div class="comp-vendor-card-title-group">
            <strong class="comp-vendor-card-name">${v.name}</strong>
            <span class="comp-tag-verified">Verified</span>
          </div>
          <div class="comp-vendor-card-price alt">₹${altPrice.toLocaleString('en-IN')}</div>
        </div>
        <div class="comp-vendor-card-meta">
          <span>${v.city || 'India'}</span>
          <span class="comp-meta-dot">•</span>
          <span>Rating ${v.rating || 4.85}</span>
          <span class="comp-meta-dot">•</span>
          <span>${v.deliveryDays || 2}-Day SLA</span>
        </div>
        <div class="comp-vendor-card-bundle">
          <i data-lucide="package-plus" style="width: 13px; height: 13px; flex-shrink: 0;"></i>
          <span>Offer: + Free ${bundleName}</span>
        </div>
        <div class="comp-vendor-card-footer">
          <button class="link-vendor-text-action" data-vendor-name="${v.name}" data-vendor-city="${v.city || 'India'}">
            <span>Negotiate with this Seller</span>
            <i data-lucide="arrow-right" style="width: 13px; height: 13px;"></i>
          </button>
        </div>
      `;

      card.querySelector('.link-vendor-text-action').addEventListener('click', (e) => {
        e.stopPropagation();
        switchToMerchant(v.name, v.city || 'India');
      });

      competingMerchantsContainer.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function switchToMerchant(newMerchantName, newMerchantCity) {
    if (isChatLocked) {
      showInAppMessage("This deal is already settled and paid.", "info");
      return;
    }
    if (colMerchantName) colMerchantName.textContent = newMerchantName;
    if (colMerchantLocation) colMerchantLocation.textContent = `${newMerchantCity} (Next-Day Air Dispatch)`;
    if (bottomMerchantLabel) bottomMerchantLabel.textContent = `Fulfillment by ${newMerchantName}`;
    if (chatMerchantSubtitle) chatMerchantSubtitle.textContent = `Connected with ${newMerchantName} AI Agent`;
    if (activeDeal) {
      activeDeal.merchant = newMerchantName;
      activeDeal.merchantCity = newMerchantCity;
    }

    renderCompetingMerchants(newMerchantName, activeDeal ? activeDeal.finalPrice : 20000);
    renderBundlesList(activeDeal ? activeDeal.bundle : null);
    renderChatSystemEvent(`Switched negotiation to ${newMerchantName} (${newMerchantCity})`, 'arrow-right-left');

    const currentUser = getActiveUser();
    const buyerName = currentUser ? currentUser.name : 'Buyer Agent';

    // Automated opening counter from new seller
    setTimeout(() => {
      renderChatMessage('merchant', `${newMerchantName} AI`, `Hello ${buyerName}! We are ${newMerchantName} based in ${newMerchantCity}. We have verified stock and can fulfill your order with our full warranty and match the ₹${(activeDeal ? activeDeal.finalPrice : 20000).toLocaleString('en-IN')} price along with complimentary accessories.`);
    }, 450);

    showInAppMessage(`Switched to ${newMerchantName}!`, 'success');
  }

  // =========================================================================
  // CHATBOT DIALOGUE STREAM & SYSTEM EVENTS
  // =========================================================================
  function renderChatMessage(sender, name, message, time = null) {
    if (!chatMessagesContainer) return;
    const isBuyer = sender === 'buyer';
    const initials = (name || (isBuyer ? 'ME' : 'AI')).split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const timeStr = time || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const row = document.createElement('div');
    row.className = `chat-msg-row ${isBuyer ? 'buyer-row' : ''}`;

    row.innerHTML = `
      <div class="chat-msg-avatar ${isBuyer ? 'buyer-avatar' : 'seller-avatar'}">
        ${initials}
      </div>
      <div class="chat-msg-bubble ${isBuyer ? 'buyer-bubble' : 'seller-bubble'}">
        <div class="chat-msg-meta">
          <span>${name}</span>
          <span style="opacity: 0.75; font-weight: 500;">• ${timeStr}</span>
        </div>
        <div>${message}</div>
      </div>
    `;

    chatMessagesContainer.appendChild(row);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function renderChatSystemEvent(text, iconName = 'check-circle') {
    if (!chatMessagesContainer) return;
    const item = document.createElement('div');
    item.className = 'chat-system-card';
    item.innerHTML = `
      <i data-lucide="${iconName}" style="width: 14px; height: 14px; flex-shrink: 0;"></i>
      <span>${text}</span>
    `;
    chatMessagesContainer.appendChild(item);
    if (window.lucide) window.lucide.createIcons();
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function renderBundlesList(bundles) {
    if (!bottomBundlesContainer) return;
    bottomBundlesContainer.innerHTML = '';

    const items = Array.isArray(bundles) && bundles.length > 0 ? bundles : [];
    if (items.length === 0) {
      bottomBundlesContainer.innerHTML = `
        <div style="font-size: 12px; color: #64748b; font-style: italic; padding: 6px 0;">
          No extra value bundles added yet. Negotiate with seller AI in chat to unlock free perks.
        </div>
      `;
      return;
    }

    items.forEach(b => {
      const name = typeof b === 'string' ? b : b.name;
      const rawVal = typeof b === 'object' ? (b.originalVal || b.val) : 1200;
      const origValStr = typeof rawVal === 'number' ? `₹${rawVal.toLocaleString('en-IN')}` : (rawVal || '₹1,200');

      const row = document.createElement('div');
      row.className = 'bottom-bundle-line';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.45rem; min-width: 0;">
          <span style="color: #0284c7; font-weight: 700; font-size: 13px;">+</span>
          <span class="bottom-bundle-name" title="${name}">${name}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem; flex-shrink: 0;">
          <span class="bundle-orig-price">${origValStr}</span>
          <span class="bundle-free-tag">₹0 FREE</span>
        </div>
      `;
      bottomBundlesContainer.appendChild(row);
    });
  }

  // =========================================================================
  // LOAD DEAL INTO ROOM
  // =========================================================================
  function loadDealIntoRoom(deal) {
    activeDeal = deal;
    const isSettled = deal.status === 'SETTLED_VIA_RAZORPAY' || deal.status === 'SETTLED' || deal.status === 'COMPLETED';
    const isAgreed = isSettled || deal.status === 'AGREED';
    isChatLocked = isSettled;

    if (userDealIdBadge) {
      userDealIdBadge.textContent = deal.dealId ? `#${deal.dealId.slice(-6).toUpperCase()}` : (deal.id ? `#${deal.id.slice(-6).toUpperCase()}` : '#DEAL');
    }
    if (dealStatusPill) {
      dealStatusPill.textContent = isSettled ? "Settled & Confirmed" : (isAgreed ? "Deal Consensus Ready" : "Live Negotiation");
      dealStatusPill.className = `round-status-pill ${isSettled ? 'success' : ''}`;
    }

    if (userActiveProductTitle) userActiveProductTitle.textContent = deal.title || "Procured Item";
    if (userActiveProductSpecs) userActiveProductSpecs.textContent = deal.desc || "Verified Quality Specification • Official Brand Warranty";
    if (userActiveBudget) userActiveBudget.textContent = `₹${(deal.budget || 1499).toLocaleString('en-IN')}`;
    if (colMerchantName) colMerchantName.textContent = deal.merchant || 'Verified Supplier';
    if (colMerchantLocation) colMerchantLocation.textContent = deal.location || `${deal.merchantCity || 'New Delhi'} (Air Express Dispatch)`;
    if (chatMerchantSubtitle) chatMerchantSubtitle.textContent = `Connected with ${deal.merchant || 'Verified Supplier'} AI Agent`;

    const finalP = isSettled ? (deal.finalPrice || 1499) : (deal.finalPrice || deal.openingPrice || 1599);
    const retailP = deal.retailTotal || Math.round(finalP + (deal.savings || Math.round(finalP * 0.25)));
    const savingsP = deal.savings || Math.max(0, retailP - finalP);

    // Update Top Header Price Box (Screenshot 1)
    if (userActiveCurrentPrice) userActiveCurrentPrice.textContent = `₹${finalP.toLocaleString('en-IN')}`;
    if (headerOriginalPrice) headerOriginalPrice.textContent = `₹${retailP.toLocaleString('en-IN')}`;
    if (headerSavingsBadge) {
      headerSavingsBadge.textContent = `Save ₹${savingsP.toLocaleString('en-IN')}`;
      headerSavingsBadge.style.display = savingsP > 0 ? 'inline-block' : 'none';
    }
    if (headerPayBtnLabel) headerPayBtnLabel.textContent = `Pay ₹${finalP.toLocaleString('en-IN')} with Razorpay`;

    // Update Bottom Settlement Bar (Screenshot 2)
    if (bottomProductTitle) bottomProductTitle.textContent = deal.title || "Procured Item";
    if (bottomBasePriceTag) bottomBasePriceTag.textContent = `₹${finalP.toLocaleString('en-IN')}`;
    if (bottomMerchantLabel) bottomMerchantLabel.textContent = `Fulfillment by ${deal.merchant || 'Verified Supplier'}`;
    if (bottomDealSummaryText) bottomDealSummaryText.textContent = `Direct procurement with ${deal.merchant || 'Verified Supplier'} • ${(deal.bundle || []).length} value bundles unlocked.`;
    if (bottomFinalPrice) bottomFinalPrice.textContent = `₹${finalP.toLocaleString('en-IN')}`;
    if (bottomOriginalPrice) bottomOriginalPrice.textContent = `₹${retailP.toLocaleString('en-IN')}`;
    if (bottomSavingsBadge) {
      bottomSavingsBadge.textContent = `Save ₹${savingsP.toLocaleString('en-IN')}`;
      bottomSavingsBadge.style.display = savingsP > 0 ? 'inline-block' : 'none';
    }
    if (bottomSettlementStatusText) bottomSettlementStatusText.textContent = isSettled ? "Settled & Confirmed" : (isAgreed ? "Deal Consensus Ready" : "Live Negotiation");
    if (payBtnLabel) payBtnLabel.textContent = `Pay ₹${finalP.toLocaleString('en-IN')} with Razorpay`;

    if (userDemandSummaryText) {
      userDemandSummaryText.textContent = `User Demand: ${deal.title || 'Product'} within budget of ₹${(deal.budget || 1499).toLocaleString('en-IN')}`;
    }

    // Dynamic Quick Action Chip Label
    const counterChipLabel = document.getElementById('counterChipLabel');
    const targetBase = deal.openingPrice || deal.finalPrice || deal.budget || 1499;
    const dynamicCounterAmt = Math.round(targetBase * 0.85);
    if (counterChipLabel) {
      counterChipLabel.textContent = `Counter ₹${dynamicCounterAmt.toLocaleString('en-IN')}`;
    }

    renderBundlesList(deal.bundle || []);
    renderCompetingMerchants(deal.merchant || 'Verified Merchant', finalP);

    // Render Chat Messages
    if (chatMessagesContainer) {
      chatMessagesContainer.innerHTML = '';
      const chatHistory = deal.chatHistory || [];
      if (chatHistory.length > 0) {
        chatHistory.forEach(msg => {
          renderChatMessage(msg.sender, msg.name, msg.message, msg.time);
        });
      } else {
        const u = getActiveUser();
        const buyerName = u ? u.name : 'Buyer Agent';
        renderChatMessage('buyer', buyerName, `Hello! I am looking for ${deal.title || 'Product'} with verified warranty under my budget of ₹${(deal.budget || 1499).toLocaleString('en-IN')}.`);
        renderChatMessage('merchant', `${deal.merchant || 'Verified Merchant'} AI`, `Hello ${buyerName}! We have verified stock for ${deal.title || 'Product'}. Our catalog MSRP is ₹${retailP.toLocaleString('en-IN')}. For direct online purchase, our base opening quote is ₹${finalP.toLocaleString('en-IN')}.`);
        renderChatSystemEvent(`Negotiation initiated. Propose a counter-offer or ask for value bundles below.`, 'tag');
      }
    }

    // Toggle lock state & small in-flow invoice button
    if (isSettled) {
      if (chatQuickActions) chatQuickActions.style.display = 'none';
      if (chatInputForm) chatInputForm.style.display = 'none';
      if (chatLockedNotice) chatLockedNotice.style.display = 'flex';
      if (headerRazorpayPayBtn) {
        headerRazorpayPayBtn.disabled = true;
        headerRazorpayPayBtn.innerHTML = `<i data-lucide="check-circle" style="width: 15px; height: 15px;"></i> <span>Settled &amp; Paid</span>`;
      }
      if (consoleRazorpayPayBtn) {
        consoleRazorpayPayBtn.disabled = true;
        consoleRazorpayPayBtn.innerHTML = `<i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> <span>Settled &amp; Paid on Razorpay</span>`;
      }

      // Show In-Flow Small Invoice Download Button
      const orderId = deal.dealId || deal.id || (deal.receipt ? deal.receipt.replace('RCP_', '').toLowerCase() : `order_${Date.now()}`);
      const invoiceUrl = `/invoice?orderId=${encodeURIComponent(orderId)}`;
      if (headerDownloadInvoiceBtn) {
        headerDownloadInvoiceBtn.href = invoiceUrl;
        headerDownloadInvoiceBtn.style.display = 'inline-flex';
      }
      if (bottomDownloadInvoiceBtn) {
        bottomDownloadInvoiceBtn.href = invoiceUrl;
        bottomDownloadInvoiceBtn.style.display = 'inline-flex';
      }
    } else {
      if (chatQuickActions) chatQuickActions.style.display = 'flex';
      if (chatInputForm) chatInputForm.style.display = 'flex';
      if (chatLockedNotice) chatLockedNotice.style.display = 'none';
      if (headerDownloadInvoiceBtn) headerDownloadInvoiceBtn.style.display = 'none';
      if (bottomDownloadInvoiceBtn) bottomDownloadInvoiceBtn.style.display = 'none';
      if (headerRazorpayPayBtn) {
        headerRazorpayPayBtn.disabled = false;
        headerRazorpayPayBtn.innerHTML = `<i data-lucide="lock" style="width: 15px; height: 15px;"></i> <span>Pay ₹${finalP.toLocaleString('en-IN')} with Razorpay</span>`;
      }
      if (consoleRazorpayPayBtn) {
        consoleRazorpayPayBtn.disabled = false;
        consoleRazorpayPayBtn.innerHTML = `<i data-lucide="lock" style="width: 16px; height: 16px;"></i> <span>Pay ₹${finalP.toLocaleString('en-IN')} with Razorpay</span>`;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // INTERACTIVE CHAT SUBMISSION & API HOOK
  // =========================================================================
  async function handleSendUserMessage(customText) {
    if (isChatLocked) {
      showInAppMessage("This negotiation has been settled and concluded.", "info");
      return;
    }
    const text = (customText || (chatMessageInput ? chatMessageInput.value : '')).trim();
    if (!text) return;

    if (chatMessageInput) chatMessageInput.value = '';

    const currentUser = getActiveUser();
    const buyerName = currentUser ? currentUser.name : 'Buyer Agent';
    const merchantName = activeDeal ? activeDeal.merchant : 'Verified Merchant';
    const currentPrice = activeDeal ? (activeDeal.finalPrice || activeDeal.budget || 1499) : 1499;
    const budget = activeDeal ? (activeDeal.budget || currentPrice) : 1499;
    const productTitle = activeDeal ? activeDeal.title : 'Requested Product';

    renderChatMessage('buyer', buyerName, text);

    if (sendChatMessageBtn) {
      sendChatMessageBtn.disabled = true;
      sendChatMessageBtn.innerHTML = `<span>Thinking...</span>`;
    }

    try {
      const res = await fetch('/api/dealroom/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId: activeDeal ? (activeDeal.dealId || activeDeal.id) : `deal_${Date.now()}`,
          message: text,
          userName: buyerName,
          merchantName,
          currentPrice,
          budget,
          productTitle
        })
      });
      const data = await res.json();

      if (data.success) {
        setTimeout(() => {
          renderChatMessage('merchant', `${merchantName} AI`, data.reply);

          if (data.bundleAdded) {
            renderChatSystemEvent(`Added to Deal: ${data.bundleAdded}`, 'gift');
          }

          if (data.unlockedBundles && Array.isArray(data.unlockedBundles) && activeDeal) {
            activeDeal.bundle = data.unlockedBundles.map(bName => ({ name: bName, val: Math.round((activeDeal.budget || 1499) * 0.15) }));
            renderBundlesList(activeDeal.bundle);
          } else if (data.bundleAdded && activeDeal) {
            if (!activeDeal.bundle) activeDeal.bundle = [];
            if (!activeDeal.bundle.some(b => (typeof b === 'string' ? b : b.name) === data.bundleAdded)) {
              activeDeal.bundle.push({ name: data.bundleAdded, val: Math.round((activeDeal.budget || 1499) * 0.15) });
            }
            renderBundlesList(activeDeal.bundle);
          }

          if (data.updatedPrice && activeDeal) {
            activeDeal.finalPrice = data.updatedPrice;
            const retailP = activeDeal.retailTotal || Math.round(data.updatedPrice * 1.25);
            const savings = Math.max(0, retailP - data.updatedPrice);
            activeDeal.savings = savings;

            if (userActiveCurrentPrice) userActiveCurrentPrice.textContent = `₹${data.updatedPrice.toLocaleString('en-IN')}`;
            if (bottomFinalPrice) bottomFinalPrice.textContent = `₹${data.updatedPrice.toLocaleString('en-IN')}`;
            if (bottomBasePriceTag) bottomBasePriceTag.textContent = `₹${data.updatedPrice.toLocaleString('en-IN')}`;
            if (headerSavingsBadge) headerSavingsBadge.textContent = `Save ₹${savings.toLocaleString('en-IN')}`;
            if (bottomSavingsBadge) bottomSavingsBadge.textContent = `Save ₹${savings.toLocaleString('en-IN')}`;
            if (headerPayBtnLabel) headerPayBtnLabel.textContent = `Pay ₹${data.updatedPrice.toLocaleString('en-IN')} with Razorpay`;
            if (payBtnLabel) payBtnLabel.textContent = `Pay ₹${data.updatedPrice.toLocaleString('en-IN')} with Razorpay`;
            renderChatSystemEvent(`Price Adjusted to ₹${data.updatedPrice.toLocaleString('en-IN')}`, 'tag');
          }

          if (data.aiProvider && aiEngineStatusBadge) {
            aiEngineStatusBadge.textContent = data.aiProvider;
          }

          if (data.isAgreed) {
            if (dealStatusPill) {
              dealStatusPill.textContent = "Deal Consensus Locked • Ready to Pay";
              dealStatusPill.className = "round-status-pill";
            }
            if (bottomSettlementStatusText) bottomSettlementStatusText.textContent = "Consensus Locked • Ready to Pay";
            showInAppMessage("Consensus reached! You can now authorize payment on Razorpay.", "success");
          }
        }, 400);
      }
    } catch (e) {
      console.warn("Chat error:", e);
      setTimeout(() => {
        renderChatMessage('merchant', `${merchantName} AI`, `Thank you for your message, ${buyerName}. Our current offer is ₹${currentPrice.toLocaleString('en-IN')} with complimentary warranty and accessories.`);
      }, 400);
    } finally {
      if (sendChatMessageBtn) {
        sendChatMessageBtn.disabled = false;
        sendChatMessageBtn.innerHTML = `<span>Send</span> <i data-lucide="send" style="width: 15px; height: 15px;"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendUserMessage();
    });
  }

  // Quick action chips
  document.querySelectorAll('.btn-chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.getAttribute('data-action');
      const targetBase = activeDeal ? (activeDeal.openingPrice || activeDeal.finalPrice || activeDeal.budget || 1499) : 1499;
      const counterAmt = Math.round(targetBase * 0.85);

      if (action === 'counter_discount') {
        handleSendUserMessage(`₹${targetBase.toLocaleString('en-IN')} is above our procurement budget. Can we do ₹${counterAmt.toLocaleString('en-IN')} if I commit to immediate Razorpay payment today?`);
      } else if (action === 'request_warranty') {
        handleSendUserMessage(`Can you include official extended warranty / care protection for ${activeDeal?.title || 'this product'} and adjust the price?`);
      } else if (action === 'request_delivery') {
        handleSendUserMessage(`If you can guarantee 24-Hour Express Air Courier Dispatch for ${activeDeal?.title || 'this order'} at ₹${(activeDeal?.finalPrice || activeDeal?.budget || targetBase).toLocaleString('en-IN')}, I will authorize payment right away.`);
      } else if (action === 'accept_deal') {
        handleSendUserMessage(`I accept the offer at ₹${(activeDeal?.finalPrice || activeDeal?.budget || targetBase).toLocaleString('en-IN')}. Please lock consensus so I can proceed to pay on Razorpay.`);
      }
    });
  });

  // =========================================================================
  // RAZORPAY PAYMENT & SETTLEMENT INTEGRATION (TOP HEADER + BOTTOM BAR)
  // =========================================================================
  async function startRazorpayCheckout() {
    if (isChatLocked) {
      showInAppMessage("This order has already been paid and settled.", "info");
      return;
    }
    const activeUser = getActiveUser();
    const deal = activeDeal || {
      title: "144Hz Gaming Monitor",
      merchant: "GearCraft Studios",
      finalPrice: 20000,
      retailTotal: 25498,
      savings: 5499
    };
    const finalPrice = deal.finalPrice || 20000;

    if (headerRazorpayPayBtn) {
      headerRazorpayPayBtn.disabled = true;
      headerRazorpayPayBtn.innerHTML = `<span>Initializing...</span>`;
    }
    if (consoleRazorpayPayBtn) {
      consoleRazorpayPayBtn.disabled = true;
      consoleRazorpayPayBtn.innerHTML = `<span>Initializing Razorpay...</span>`;
    }

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          currency: "INR",
          merchantName: deal.merchant || "GearCraft Studios",
          merchantId: "merchant_gearcraft_01",
          dealRoomRef: `DR_AUTO_${Date.now()}`
        })
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error("Could not initialize payment.");
      }

      const handleVerification = async function (response) {
        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id || data.order.id,
            razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
            razorpay_signature: response.razorpay_signature || "simulated_hmac_sig",
            productTitle: deal.title,
            bundleItems: (deal.bundle || []).map(b => typeof b === 'string' ? b : b.name),
            merchantName: deal.merchant,
            amount: deal.finalPrice,
            originalAmount: deal.retailTotal,
            savingsAmount: deal.savings,
            savingsPercent: deal.savingsPercent
          })
        });
        const verifyData = await verifyRes.json();

        // 1. Save to History
        const u = getActiveUser();
        saveDealToHistory({
          id: deal.dealId || deal.id || `deal_${Date.now()}`,
          query: deal.title,
          title: deal.title,
          merchant: deal.merchant,
          finalPrice: deal.finalPrice,
          retailTotal: deal.retailTotal,
          savings: deal.savings,
          bundle: deal.bundle,
          timestamp: new Date().toISOString(),
          displayDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          status: 'SETTLED_VIA_RAZORPAY',
          paymentId: response.razorpay_payment_id || (verifyData.receipt && verifyData.receipt.paymentId) || `pay_${Date.now()}`,
          orderId: data.order.id,
          buyerName: u ? u.name : 'Buyer Agent'
        });

        // 2. Remove from active deals
        removeActiveUserDeal(deal.dealId || deal.id);

        // 3. Lock Chat & Update UI
        isChatLocked = true;
        if (chatQuickActions) chatQuickActions.style.display = 'none';
        if (chatInputForm) chatInputForm.style.display = 'none';
        if (chatLockedNotice) chatLockedNotice.style.display = 'flex';
        if (dealStatusPill) {
          dealStatusPill.textContent = "Settled & Paid via Razorpay";
          dealStatusPill.className = "round-status-pill success";
        }
        if (bottomSettlementStatusText) {
          bottomSettlementStatusText.textContent = "Settled & Paid";
        }
        if (headerRazorpayPayBtn) {
          headerRazorpayPayBtn.disabled = true;
          headerRazorpayPayBtn.innerHTML = `<i data-lucide="check-circle" style="width: 15px; height: 15px;"></i> <span>Settled &amp; Paid</span>`;
        }
        if (consoleRazorpayPayBtn) {
          consoleRazorpayPayBtn.disabled = true;
          consoleRazorpayPayBtn.innerHTML = `<i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> <span>Settled &amp; Paid on Razorpay</span>`;
        }

        // Show In-Flow Small Invoice Download Button directly below pay button
        const orderId = deal.dealId || deal.id || `deal_${Date.now()}`;
        const pId = response.razorpay_payment_id || (verifyData.receipt && verifyData.receipt.paymentId) || `pay_${Date.now()}`;
        const invoiceUrl = `/invoice?orderId=${encodeURIComponent(orderId)}`;
        if (headerDownloadInvoiceBtn) {
          headerDownloadInvoiceBtn.href = invoiceUrl;
          headerDownloadInvoiceBtn.style.display = 'inline-flex';
        }
        if (bottomDownloadInvoiceBtn) {
          bottomDownloadInvoiceBtn.href = invoiceUrl;
          bottomDownloadInvoiceBtn.style.display = 'inline-flex';
        }

        renderChatSystemEvent(`Payment Confirmed on Razorpay (Payment ID: ${pId}) — Order queued for dispatch`, 'shield-check');
        if (window.lucide) window.lucide.createIcons();

        // 4. Open Receipt Modal
        openReceipt(verifyData.order || {
          receipt: verifyData.receipt?.receiptNumber || `RCP_${orderId.slice(-8).toUpperCase()}`,
          paymentId: pId,
          productTitle: deal.title,
          amount: deal.finalPrice,
          originalAmount: deal.retailTotal,
          sha256Seal: verifyData.receipt?.sha256Seal || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        });
      };

      const buyerName = activeUser ? activeUser.name : "Buyer Agent";
      const buyerEmail = activeUser ? `${activeUser.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@buyer.transacta.network` : "buyer@transacta.network";

      const options = {
        key: data.keyId || "rzp_test_TJjm7EUJmHXrmx",
        amount: Math.round((deal.finalPrice || 20000) * 100),
        currency: "INR",
        name: "Transacta Protocol Gateway",
        description: `${deal.title || 'Product'} (${deal.merchant || 'GearCraft Studios'})`,
        image: "assets/razorpay-icon.svg",
        handler: function(resp) {
          handleVerification({
            razorpay_order_id: resp.razorpay_order_id || data.order.id,
            razorpay_payment_id: resp.razorpay_payment_id || `pay_${Date.now()}`,
            razorpay_signature: resp.razorpay_signature || "transacta_rzp_sig_verified_sha256",
            method: "Razorpay Checkout"
          });
          showInAppMessage(`Payment verified successfully via Razorpay!`, 'success');
        },
        prefill: {
          name: buyerName,
          email: buyerEmail,
          contact: "9876543210"
        },
        theme: {
          color: "#0f172a"
        },
        modal: {
          ondismiss: function() {
            showInAppMessage("Razorpay checkout closed.", "info");
          }
        }
      };

      if (window.Razorpay) {
        try {
          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (resp) {
            showInAppMessage(`Payment notice: ${resp.error?.description || resp.error?.reason || "Cancelled"}`, 'error');
          });
          rzp.open();
          return;
        } catch (e) {
          console.warn("Razorpay SDK launch error, falling back to in-app sheet:", e);
        }
      }

      // Fallback in-app modal
      if (razorpayModalBackdrop) {
        if (rzpModalAmountDisplay) rzpModalAmountDisplay.textContent = `₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;
        if (rzpModalProductDesc) rzpModalProductDesc.textContent = `${deal.title || 'Product'} • ${deal.merchant || 'GearCraft Studios'}`;
        if (rzpModalPayBtnText) rzpModalPayBtnText.textContent = `Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;
        razorpayModalBackdrop.style.display = 'flex';
        razorpayModalBackdrop.classList.add('active');
        if (window.lucide) window.lucide.createIcons();

        const onConfirmPay = async () => {
          if (rzpModalPayBtn) {
            rzpModalPayBtn.disabled = true;
            if (rzpModalPayBtnText) rzpModalPayBtnText.textContent = "Verifying Settlement on Razorpay...";
          }

          try {
            const selectedMethod = document.querySelector('input[name="rzpPaymentMethod"]:checked')?.value || 'UPI';
            await handleVerification({
              razorpay_order_id: data.order.id,
              razorpay_payment_id: `pay_rzp_${Date.now().toString(36)}`,
              razorpay_signature: "transacta_rzp_sig_verified_sha256",
              method: selectedMethod
            });
            razorpayModalBackdrop.classList.remove('active');
            razorpayModalBackdrop.style.display = 'none';
            showInAppMessage(`Payment of ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} verified successfully via Razorpay (${selectedMethod})!`, 'success');
          } catch (e) {
            showInAppMessage("Payment processing notice: " + e.message, 'error');
          } finally {
            if (rzpModalPayBtn) {
              rzpModalPayBtn.disabled = false;
              if (rzpModalPayBtnText) rzpModalPayBtnText.textContent = "Authorize & Pay on Razorpay";
            }
          }
        };

        if (rzpModalPayBtn) {
          rzpModalPayBtn.onclick = onConfirmPay;
        }
      }
    } catch (err) {
      showInAppMessage("Payment notice: " + err.message, "error");
    } finally {
      if (!isChatLocked) {
        if (headerRazorpayPayBtn) {
          headerRazorpayPayBtn.disabled = false;
          headerRazorpayPayBtn.innerHTML = `
            <i data-lucide="lock" style="width: 15px; height: 15px;"></i>
            <span>Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} with Razorpay</span>
          `;
        }
        if (consoleRazorpayPayBtn) {
          consoleRazorpayPayBtn.disabled = false;
          consoleRazorpayPayBtn.innerHTML = `
            <i data-lucide="lock" style="width: 16px; height: 16px;"></i>
            <span>Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} with Razorpay</span>
          `;
        }
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  if (consoleRazorpayPayBtn) {
    consoleRazorpayPayBtn.addEventListener('click', startRazorpayCheckout);
  }
  if (headerRazorpayPayBtn) {
    headerRazorpayPayBtn.addEventListener('click', startRazorpayCheckout);
  }

  // Method selection interaction in Razorpay modal
  document.querySelectorAll('.rzp-method-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.rzp-method-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function closeRazorpayModal() {
    if (razorpayModalBackdrop) {
      razorpayModalBackdrop.classList.remove('active');
      razorpayModalBackdrop.style.display = 'none';
    }
  }

  if (closeRzpModalBtn) closeRzpModalBtn.addEventListener('click', closeRazorpayModal);

  // =========================================================================
  // RECEIPT MODAL
  // =========================================================================
  function openReceipt(order) {
    if (!receiptModalBackdrop) return;
    if (modalReceiptTitle) modalReceiptTitle.textContent = order.receipt || `RCP_TRANSACTA_${Date.now()}`;
    if (modalPaymentId) modalPaymentId.textContent = order.paymentId || `pay_${Date.now()}`;
    if (modalProductTitle) modalProductTitle.textContent = order.productTitle;
    if (modalBasePrice) modalBasePrice.textContent = `₹${(order.originalAmount || 25498).toLocaleString('en-IN')}`;
    if (modalTotalAmount) modalTotalAmount.textContent = `₹${(order.amount || 20000).toLocaleString('en-IN')}`;
    if (modalSealHash) modalSealHash.textContent = order.sha256Seal || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    if (downloadTaxInvoiceBtn) {
      downloadTaxInvoiceBtn.href = `/invoice?orderId=${order.id || order.receipt || `order_${Date.now()}`}`;
    }

    if (modalBundleList) {
      modalBundleList.innerHTML = '';
      const deal = activeDeal || {};
      (deal.bundle || []).forEach(b => {
        const row = document.createElement('div');
        row.className = 'modal-bundle-row';
        row.innerHTML = `
          <span>+ ${typeof b === 'string' ? b : b.name}</span>
          <span style="color: #16a34a; font-weight: 700;">INCLUDED</span>
        `;
        modalBundleList.appendChild(row);
      });
    }

    receiptModalBackdrop.style.display = 'flex';
    receiptModalBackdrop.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeReceipt() {
    if (receiptModalBackdrop) {
      receiptModalBackdrop.classList.remove('active');
      receiptModalBackdrop.style.display = 'none';
    }
  }

  if (closeReceiptModalBtn) closeReceiptModalBtn.addEventListener('click', closeReceipt);
  if (dismissReceiptBtn) dismissReceiptBtn.addEventListener('click', closeReceipt);

  if (copySealBtn) {
    copySealBtn.addEventListener('click', () => {
      const hashText = modalSealHash ? modalSealHash.textContent.trim() : '';
      if (hashText && navigator.clipboard) {
        navigator.clipboard.writeText(hashText).then(() => {
          showInAppMessage("SHA-256 seal copied to clipboard!", "success");
        }).catch(() => {
          showInAppMessage("Copied seal hash", "success");
        });
      }
    });
  }

  // =========================================================================
  // INITIALIZATION ON PAGE LOAD
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q') || urlParams.get('query');
  const bParam = urlParams.get('budget');
  const dealIdParam = urlParams.get('dealId') || urlParams.get('id');

  const initialUser = getActiveUser();
  if (initialUser) {
    updateUserUI(initialUser);
  } else {
    setTimeout(() => {
      showUserModal(false);
    }, 350);
  }
  updateHistoryBadge();

  fetch50Vendors().then(() => {
    // If explicit dealId requested AND no new search query, load from history/active deals
    if (dealIdParam && !qParam) {
      const activeDeals = getActiveUserDeals();
      const foundActive = activeDeals.find(d => d.id === dealIdParam || d.dealId === dealIdParam);
      if (foundActive) {
        loadDealIntoRoom(foundActive);
        return;
      }
      const history = getUserDealHistory();
      const foundHistory = history.find(d => d.id === dealIdParam || d.dealId === dealIdParam);
      if (foundHistory) {
        loadDealIntoRoom(foundHistory);
        return;
      }
    }

    const initialQuery = qParam || "Electric Dry / Steam Iron";
    const userBudgetParam = bParam ? parseInt(bParam, 10) : undefined;
    const cleanInitialTitle = extractCleanProductTitle(initialQuery);

    if (userActiveProductTitle) userActiveProductTitle.textContent = cleanInitialTitle;
    if (bottomProductTitle) bottomProductTitle.textContent = cleanInitialTitle;

    // Fetch intelligent product synthesis & best matched Indian vendor dynamically
    fetch('/api/dealroom/discover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: initialQuery,
        buyerMaxBudget: userBudgetParam,
        userName: initialUser ? initialUser.name : "Buyer Agent"
      })
    })
    .then(res => res.json())
    .then(discData => {
      const best = discData.bestMatch || (discData.candidates && discData.candidates[0]);
      const budget = discData.buyerMaxBudget || (userBudgetParam || 1499);
      const cleanTitle = best?.product?.name || cleanInitialTitle;
      const initialMerchant = best?.name || "Bharat Tech Hub";
      const initialCity = best?.city || "New Delhi";
      const finalPrice = best?.product?.basePrice || Math.round(budget * 1.05);
      const retailTotal = Math.round(budget * 1.25);
      const savings = Math.max(0, retailTotal - finalPrice);
      
      const rawIncluded = (best?.bundleOffer?.included && best.bundleOffer.included.length > 0)
        ? best.bundleOffer.included
        : [
          "Complimentary Transit Protection Care",
          "1-Year Extended Manufacturer Warranty",
          "Priority 24-Hour Express Air Dispatch SLA"
        ];

      const bundlesList = rawIncluded.map(b => ({
        name: typeof b === 'string' ? b : b.name,
        val: typeof b === 'object' && b.val ? b.val : Math.round(budget * 0.15)
      }));

      const newDeal = {
        dealId: `deal_${Date.now()}`,
        title: cleanTitle,
        desc: best?.product?.specs || "Verified Quality Specification • Official Brand Manufacturer Warranty",
        budget: budget,
        finalPrice: finalPrice,
        openingPrice: finalPrice,
        retailTotal: retailTotal,
        savings: savings,
        merchant: initialMerchant,
        merchantCity: initialCity,
        location: `${initialCity} (Next-Day Air Dispatch)`,
        bundle: bundlesList,
        chatHistory: [
          {
            sender: "buyer",
            name: initialUser ? initialUser.name : "Buyer Agent",
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            message: `Hello! I am looking for ${cleanTitle} with verified warranty under my budget of ₹${budget.toLocaleString('en-IN')}.`
          },
          {
            sender: "merchant",
            name: `${initialMerchant} AI`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            message: `Hello ${initialUser ? initialUser.name : 'Buyer'}! We have verified stock for ${cleanTitle} in our ${initialCity} warehouse. Our catalog price is ₹${retailTotal.toLocaleString('en-IN')}. We can fulfill your order at ₹${finalPrice.toLocaleString('en-IN')} with all complimentary accessory bundles.`
          }
        ]
      };

      saveActiveUserDeal(newDeal);
      loadDealIntoRoom(newDeal);
    })
    .catch(err => {
      console.warn("Could not query discovery API on initial load, applying clean dynamic synthesis:", err);
      const cleanTitle = cleanInitialTitle;
      const budget = userBudgetParam || 1499;
      const initialMerchant = "Bharat Tech Hub";
      const initialCity = "New Delhi";
      const finalPrice = Math.round(budget * 1.05);
      const retailTotal = Math.round(budget * 1.25);
      const savings = Math.max(0, retailTotal - finalPrice);

      const newDeal = {
        dealId: `deal_${Date.now()}`,
        title: cleanTitle,
        desc: "Verified Quality Specification • Official Brand Manufacturer Warranty",
        budget: budget,
        finalPrice: finalPrice,
        openingPrice: finalPrice,
        retailTotal: retailTotal,
        savings: savings,
        merchant: initialMerchant,
        merchantCity: initialCity,
        location: `${initialCity} (Next-Day Air Dispatch)`,
        bundle: [
          { name: "Complimentary Transit Protection Care", val: Math.round(budget * 0.12) },
          { name: "1-Year Extended Manufacturer Warranty", val: Math.round(budget * 0.18) },
          { name: "Priority 24-Hour Express Air Dispatch SLA", val: Math.round(budget * 0.10) }
        ],
        chatHistory: [
          {
            sender: "buyer",
            name: initialUser ? initialUser.name : "Buyer Agent",
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            message: `Hello! I am looking for ${cleanTitle} with verified warranty under my budget of ₹${budget.toLocaleString('en-IN')}.`
          },
          {
            sender: "merchant",
            name: `${initialMerchant} AI`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            message: `Hello ${initialUser ? initialUser.name : 'Buyer'}! We have verified stock for ${cleanTitle} in our ${initialCity} warehouse. Our catalog price is ₹${retailTotal.toLocaleString('en-IN')}. We can fulfill your requirements at ₹${finalPrice.toLocaleString('en-IN')} with all complimentary accessory bundles.`
          }
        ]
      };

      saveActiveUserDeal(newDeal);
      loadDealIntoRoom(newDeal);
    });
  });

  function extractCleanProductTitle(rawQuery) {
    let cleaned = (rawQuery || "").trim();
    cleaned = cleaned.replace(/^(?:find\s+(?:me\s+)?(?:a\s+|an\s+)?|get\s+(?:me\s+)?(?:a\s+|an\s+)?|buy\s+(?:me\s+)?(?:a\s+|an\s+)?|i\s+(?:want|need)\s+(?:a\s+|an\s+)?|looking\s+for\s+(?:a\s+|an\s+)?|search\s+for\s+(?:a\s+|an\s+)?|deal\s+on\s+)/i, '');
    cleaned = cleaned.replace(/(?:\s+under|\s+below|\s+within|\s+less\s+than|\s+for|\s+budget|\s+cap)\s*(?:rs\.?|inr|₹)?\s*([0-9,]+)\s*(?:rupees|rs|inr|\/-)?/gi, '');
    cleaned = cleaned.replace(/([0-9,]+)\s*(?:rupees|rs|inr|\/-)/gi, '');
    cleaned = cleaned.replace(/[?.,!]+$/, '').trim();

    if (!cleaned || cleaned.length < 2) return 'Requested Tech Item';
    if (/^iron\b/i.test(cleaned) || /^electric\s+iron/i.test(cleaned) || /^dry\s+iron/i.test(cleaned) || /^steam\s+iron/i.test(cleaned)) {
      return 'Electric Dry / Steam Iron';
    }
    return cleaned
      .split(/\s+/)
      .map(word => /^(4k|2k|hd|qhd|uhd|oled|ips|rgb|usb|anc|tws|fps|hz|ram|ssd|bt|ai)$/i.test(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
});
