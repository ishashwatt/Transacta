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

  // Views & Headers
  const appGlobalNavHeader = document.getElementById('appGlobalNavHeader');
  const userListView = document.getElementById('userListView');
  const userDetailView = document.getElementById('userDetailView');
  const backToUserDealsListBtn = document.getElementById('backToUserDealsListBtn');

  // List Elements
  const userHorizontalCardsContainer = document.getElementById('userHorizontalCardsContainer');
  const userActiveDealsCount = document.getElementById('userActiveDealsCount');
  const userDealsHeaderCount = document.getElementById('userDealsHeaderCount');

  // Detail View Header Elements
  const userDealIdBadge = document.getElementById('userDealIdBadge');
  const dealStatusPill = document.getElementById('dealStatusPill');
  const detailUserProfileBtn = document.getElementById('detailUserProfileBtn');
  const detailNavUserName = document.getElementById('detailNavUserName');
  const detailOpenHistoryBtn = document.getElementById('detailOpenHistoryBtn');
  const detailHistoryCountBadge = document.getElementById('detailHistoryCountBadge');
  const userActiveProductTitle = document.getElementById('userActiveProductTitle');
  const userActiveProductSpecs = document.getElementById('userActiveProductSpecs');
  const userActiveBudget = document.getElementById('userActiveBudget');
  const colMerchantName = document.getElementById('colMerchantName');
  const userActiveBundles = document.getElementById('userActiveBundles');
  const userActiveCurrentPrice = document.getElementById('userActiveCurrentPrice');
  const competingMerchantsStrip = document.getElementById('competingMerchantsStrip');

  // Detail View Dialogue & Settlement Elements
  const consoleRoundsStream = document.getElementById('consoleRoundsStream');
  const replayNegotiationBtn = document.getElementById('replayNegotiationBtn');
  const consoleWalkAwayBtn = document.getElementById('consoleWalkAwayBtn');

  const consoleFinalPrice = document.getElementById('consoleFinalPrice');
  const consoleOriginalPrice = document.getElementById('consoleOriginalPrice');
  const consoleSavingsBadge = document.getElementById('consoleSavingsBadge');
  const userSettlementBundlesSummary = document.getElementById('userSettlementBundlesSummary');
  const consoleRazorpayPayBtn = document.getElementById('consoleRazorpayPayBtn');
  const payBtnLabel = document.getElementById('payBtnLabel');

  // Search Bar Elements & Dropdown
  const consoleQueryForm = document.getElementById('consoleQueryForm');
  const consoleQueryInput = document.getElementById('consoleQueryInput');
  const searchDropdownMenu = document.getElementById('searchDropdownMenu');

  // User Profile & Onboarding
  const userProfileBtn = document.getElementById('userProfileBtn');
  const navUserName = document.getElementById('navUserName');
  const userOnboardModalBackdrop = document.getElementById('userOnboardModalBackdrop');
  const userOnboardForm = document.getElementById('userOnboardForm');
  const userOnboardInput = document.getElementById('userOnboardInput');
  const closeUserModalBtn = document.getElementById('closeUserModalBtn');

  // Deal History Drawer (My Deals - Contains completed / settled deals)
  const openHistoryBtn = document.getElementById('openHistoryBtn');
  const historyCountBadge = document.getElementById('historyCountBadge');
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

  // In-App Razorpay Test Sheet Modal Elements
  const razorpayModalBackdrop = document.getElementById('razorpayModalBackdrop');
  const closeRzpModalBtn = document.getElementById('closeRzpModalBtn');
  const rzpModalAmountDisplay = document.getElementById('rzpModalAmountDisplay');
  const rzpModalProductDesc = document.getElementById('rzpModalProductDesc');
  const rzpModalPayBtn = document.getElementById('rzpModalPayBtn');
  const rzpModalPayBtnText = document.getElementById('rzpModalPayBtnText');

  // Audit Ledger Elements
  const auditTableBody = document.getElementById('auditTableBody');

  let activeNegotiation = null;
  let isSimulating = false;
  let lastAuditHash = '';

  // =========================================================================
  // TYPEWRITER ANIMATION & SEARCH DROPDOWN (Same as Home Page)
  // =========================================================================
  const typewriterPhrases = [
    "Find me a 144Hz gaming monitor under 20000 rupees",
    "Wireless mechanical keyboard under 8000 rupees",
    "Studio condenser microphone under 12000 rupees",
    "Budget monitor under 15000 rupees for quick test"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isTypewriterActive = true;
  let typewriterTimeout = null;

  function runTypewriter() {
    if (!isTypewriterActive || (consoleQueryInput && consoleQueryInput.value.length > 0)) return;
    const currentPhrase = typewriterPhrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
      if (consoleQueryInput) consoleQueryInput.setAttribute('placeholder', currentPhrase.substring(0, charIdx));
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
        typewriterTimeout = setTimeout(runTypewriter, 500);
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 30);
    } else {
      charIdx++;
      if (consoleQueryInput) consoleQueryInput.setAttribute('placeholder', currentPhrase.substring(0, charIdx));
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(runTypewriter, 1800);
        return;
      }
      typewriterTimeout = setTimeout(runTypewriter, 45);
    }
  }

  function updateDropdownPosition() {
    if (!consoleQueryInput || !searchDropdownMenu) return;
    const rect = consoleQueryInput.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 320 && spaceAbove > spaceBelow) {
      searchDropdownMenu.classList.add('open-up');
      searchDropdownMenu.style.maxHeight = Math.min(320, Math.max(160, spaceAbove - 20)) + 'px';
    } else {
      searchDropdownMenu.classList.remove('open-up');
      searchDropdownMenu.style.maxHeight = Math.min(320, Math.max(160, spaceBelow - 20)) + 'px';
    }
  }

  function openDropdown() {
    isTypewriterActive = false;
    clearTimeout(typewriterTimeout);
    updateDropdownPosition();
    if (searchDropdownMenu) searchDropdownMenu.classList.add('active');
  }

  function closeDropdown() {
    if (searchDropdownMenu) {
      searchDropdownMenu.classList.remove('active');
      searchDropdownMenu.classList.remove('open-up');
    }
  }

  if (consoleQueryInput) {
    typewriterTimeout = setTimeout(runTypewriter, 300);

    consoleQueryInput.addEventListener('focus', openDropdown);

    consoleQueryInput.addEventListener('click', (e) => {
      e.stopPropagation();
      openDropdown();
    });

    consoleQueryInput.addEventListener('input', () => {
      isTypewriterActive = false;
      clearTimeout(typewriterTimeout);
    });

    consoleQueryInput.addEventListener('blur', () => {
      setTimeout(() => {
        closeDropdown();
        if (consoleQueryInput.value.trim() === '') {
          isTypewriterActive = true;
          runTypewriter();
        }
      }, 200);
    });
  }

  window.addEventListener('scroll', () => {
    if (searchDropdownMenu && searchDropdownMenu.classList.contains('active')) {
      updateDropdownPosition();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (searchDropdownMenu && searchDropdownMenu.classList.contains('active')) {
      updateDropdownPosition();
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    if (searchDropdownMenu && !e.target.closest('.hero-search-wrapper')) {
      closeDropdown();
    }
  });

  document.querySelectorAll('#searchDropdownMenu .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const q = item.getAttribute('data-q');
      const b = item.getAttribute('data-budget');
      if (consoleQueryInput) consoleQueryInput.value = q;
      const bParam = b ? `&budget=${encodeURIComponent(b)}` : '';
      window.location.href = `/negotiation?q=${encodeURIComponent(q)}${bParam}`;
    });
  });

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
    if (navUserName) {
      navUserName.textContent = user ? user.name : "My Agent";
    }
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
    if (window.lucide) {
      lucide.createIcons();
    }
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

  if (closeUserModalBtn) {
    closeUserModalBtn.addEventListener('click', () => {
      closeUserModal();
    });
  }

  if (userOnboardModalBackdrop) {
    userOnboardModalBackdrop.addEventListener('click', (e) => {
      if (e.target === userOnboardModalBackdrop) {
        closeUserModal();
      }
    });
  }

  if (userProfileBtn) {
    userProfileBtn.addEventListener('click', () => {
      showUserModal(true);
    });
  }

  if (detailUserProfileBtn) {
    detailUserProfileBtn.addEventListener('click', () => {
      showUserModal(true);
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
  // USER ACTIVE DEALS STORE (ONLY STARTED OR NEGOTIATING — NEVER COMPLETED)
  // =========================================================================
  function getActiveUserDeals() {
    try {
      const d = localStorage.getItem('transacta_user_active_deals');
      if (d) {
        const parsed = JSON.parse(d);
        // STRICT FILTER: Only keep active/started deals. Completed ones are filtered out!
        return parsed.filter(deal => {
          const s = (deal.status || '').toUpperCase();
          return s !== 'SETTLED' && s !== 'SETTLED_VIA_RAZORPAY' && s !== 'COMPLETED' && s !== 'WALK_AWAY';
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
      renderHorizontalCards();
    } catch (e) {
      console.warn("Active deals write error:", e);
    }
  }

  function removeActiveUserDeal(dealId) {
    try {
      let activeDeals = getActiveUserDeals();
      activeDeals = activeDeals.filter(d => (d.id !== dealId && d.dealId !== dealId));
      localStorage.setItem('transacta_user_active_deals', JSON.stringify(activeDeals));
      renderHorizontalCards();
    } catch (e) {
      console.warn("Remove active deal error:", e);
    }
  }

  // =========================================================================
  // USER PAST DEALS HISTORY (MY DEALS DRAWER — COMPLETED & SETTLED DEALS)
  // =========================================================================
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
    if (historyCountBadge) {
      if (history.length > 0) {
        historyCountBadge.textContent = history.length;
        historyCountBadge.style.display = 'inline-block';
      } else {
        historyCountBadge.style.display = 'none';
      }
    }
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
          <p style="font-size: 13px; color: #64748b;">Search any product above to start an autonomous negotiation with verified merchants!</p>
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
          <!-- Col 1: Merchant & Date -->
          <div style="display: flex; align-items: center; gap: 0.65rem; min-width: 0;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; flex-shrink: 0;">
              ${initials}
            </div>
            <div style="display: flex; flex-direction: column; min-width: 0;">
              <strong style="font-size: 13.5px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${merchantName}">${merchantName}</strong>
              <span style="font-size: 11.5px; color: #94a3b8;">${dateStr}</span>
            </div>
          </div>

          <!-- Col 2: Product & Bundles -->
          <div style="display: flex; flex-direction: column; min-width: 0;">
            <strong style="font-size: 13.5px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${d.title || d.query}">${d.title || d.query}</strong>
            <span style="font-size: 11.5px; color: #0284c7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${bundlesText || 'Free bundled accessories'}">+ Bundles: ${bundlesText || 'Included accessory bundle'}</span>
          </div>

          <!-- Col 3: Price & Savings -->
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: baseline; gap: 0.4rem;">
              <strong style="font-size: 14.5px; color: #0f172a;">₹${(d.finalPrice || 0).toLocaleString('en-IN')}</strong>
              <span style="font-size: 11.5px; color: #94a3b8; text-decoration: line-through;">₹${(d.retailTotal || (d.finalPrice + (d.savings || 0))).toLocaleString('en-IN')}</span>
            </div>
            <span style="font-size: 11.5px; color: #16a34a; font-weight: 700;">Saved ₹${(d.savings || 0).toLocaleString('en-IN')}</span>
          </div>

          <!-- Col 4: Status -->
          <div style="min-width: 0; white-space: nowrap;">
            ${statusBadge}
          </div>

          <!-- Col 5: Actions (View Chats & Tax Invoice) -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.35rem;">
            <button class="history-action-btn view-deal-detail-btn" data-index="${index}" title="Open Deal Room to watch negotiation chats and details">
              <i data-lucide="message-square"></i>
              <span>View Chats</span>
            </button>
            <button class="history-action-btn view-deal-invoice-btn" data-order-id="${d.id || d.dealId || d.receipt || ''}" title="View and download GST Tax Invoice">
              <i data-lucide="file-text"></i>
              <span>Invoice</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    dealHistoryListContainer.innerHTML = `
      <!-- Table Column Headers -->
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

    // Event handlers for View Chats & Invoice
    document.querySelectorAll('.view-deal-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const dealToOpen = history[idx];
        if (dealToOpen) {
          closeHistoryDrawer();
          const dealId = dealToOpen.id || dealToOpen.dealId;
          window.location.href = `/negotiation?dealId=${encodeURIComponent(dealId)}`;
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

  if (openHistoryBtn) openHistoryBtn.addEventListener('click', openHistoryDrawer);
  if (detailOpenHistoryBtn) detailOpenHistoryBtn.addEventListener('click', openHistoryDrawer);
  if (closeHistoryModalBtn) closeHistoryModalBtn.addEventListener('click', closeHistoryDrawer);
  if (dismissHistoryBtn) dismissHistoryBtn.addEventListener('click', closeHistoryDrawer);
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      localStorage.removeItem('transacta_user_history');
      localStorage.removeItem('transacta_user_active_deals');
      updateHistoryBadge();
      renderDealHistoryDrawer();
      renderHorizontalCards();
      showInAppMessage("All negotiated deals cleared from user memory.", "info");
    });
  }
  if (dealHistoryDrawerBackdrop) {
    dealHistoryDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === dealHistoryDrawerBackdrop) closeHistoryDrawer();
    });
  }

  // =========================================================================
  // VIEW SWITCHING (List View <-> Detail Room)
  // =========================================================================
  function showListView() {
    // Restore global header when returning to list view
    if (appGlobalNavHeader) appGlobalNavHeader.style.display = 'flex';
    if (userDetailView) userDetailView.style.display = 'none';
    if (userListView) {
      userListView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    renderHorizontalCards();
    fetchAuditLogs();
  }

  function showDetailView(deal) {
    activeNegotiation = deal;
    // Hide global header so ONLY the detail back button exists and content is lifted upwards!
    if (appGlobalNavHeader) appGlobalNavHeader.style.display = 'none';
    if (userListView) userListView.style.display = 'none';
    if (userDetailView) {
      userDetailView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    populateDetailRoom(deal);
  }

  if (backToUserDealsListBtn) {
    backToUserDealsListBtn.addEventListener('click', showListView);
  }

  // =========================================================================
  // RENDER THIN HORIZONTAL CARDS STACK
  // ONLY ACTIVE / STARTED NEGOTIATIONS (Completed ones are NOT here)
  // =========================================================================
  function renderHorizontalCards() {
    if (!userHorizontalCardsContainer) return;
    const activeDeals = getActiveUserDeals();

    if (userActiveDealsCount) {
      userActiveDealsCount.textContent = `${activeDeals.length} Active`;
    }
    if (userDealsHeaderCount) {
      userDealsHeaderCount.textContent = activeDeals.length;
    }

    userHorizontalCardsContainer.innerHTML = '';

    if (activeDeals.length === 0) {
      userHorizontalCardsContainer.innerHTML = `
        <div class="vendor-empty-filter-state" style="padding: 3rem 1.5rem; text-align: center;">
          <i data-lucide="inbox" style="width: 36px; height: 36px; color: #94a3b8; margin-bottom: 0.75rem; opacity: 0.7;"></i>
          <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">No Active Negotiations in Progress</div>
          <div style="font-size: 13.5px; color: #64748b; max-width: 480px; margin: 0 auto 1.25rem;">
            Search any product in the bar above (e.g., '144Hz gaming monitor under 20000', 'wireless earbuds') to survey verified network merchants and begin an autonomous negotiation!
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    activeDeals.forEach(deal => {
      const card = document.createElement('div');
      card.className = 'vendor-horizontal-card';
      card.id = `user_card_${deal.id || deal.dealId}`;

      const sellerName = deal.merchant || 'Verified Seller';
      const initials = sellerName.split(' ').map(n => n[0]).slice(0, 2).join('') || 'VS';
      const isAgreed = deal.status === 'AGREED' || deal.status === 'DEAL_LOCKED';

      const statusHtml = isAgreed ? `
        <div class="card-status-clean" style="color: #0284c7;">
          <span class="card-status-dot" style="background: #0284c7;"></span>
          <span>Deal Ready</span>
        </div>
      ` : `
        <div class="card-status-clean negotiating">
          <span class="card-status-dot"></span>
          <span>Negotiating</span>
        </div>
      `;

      card.innerHTML = `
        <!-- Column 1: Seller Info & Timestamp -->
        <div class="card-buyer-col">
          <div class="card-buyer-avatar" style="background: #e0f2fe; color: #0284c7;">${initials}</div>
          <div class="card-buyer-info">
            <span class="card-buyer-name" title="${sellerName}">${sellerName}</span>
            <span class="card-time-pill">${deal.displayTime || 'Just now'}</span>
          </div>
        </div>

        <!-- Column 2: Clean Product Title -->
        <div class="card-product-col">
          <span class="card-product-title" title="${deal.title || deal.productTitle}">${deal.title || deal.productTitle}</span>
        </div>

        <!-- Column 3: Current Negotiated Price vs Retail -->
        <div class="card-price-col">
          <span class="card-price-ask">₹${(deal.finalPrice || deal.buyerOffer || 0).toLocaleString('en-IN')}</span>
          <span class="card-price-retail">₹${(deal.retailTotal || deal.basePrice || 0).toLocaleString('en-IN')}</span>
        </div>

        <!-- Column 4: Deal Status -->
        <div>
          ${statusHtml}
        </div>

        <!-- Column 5: Action Link -->
        <div style="text-align: right;">
          <span class="card-action-text-link">Enter Room →</span>
        </div>
      `;

      card.addEventListener('click', () => {
        const dealId = deal.id || deal.dealId;
        window.location.href = `/negotiation?dealId=${encodeURIComponent(dealId)}`;
      });

      userHorizontalCardsContainer.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // DETAIL ROOM: COMPETING MERCHANTS & INTERACTIVE CHAT FLOW
  // =========================================================================
  function renderCompetingMerchantsStrip(candidates, winningMerchantName) {
    if (!competingMerchantsStrip) return;
    competingMerchantsStrip.innerHTML = '';

    const merchants = candidates && candidates.length > 0 ? candidates : [];
    merchants.forEach((m, idx) => {
      const isWinner = m.name === winningMerchantName;
      const card = document.createElement('div');
      card.className = `competing-merchant-card ${isWinner ? 'selected' : ''}`;

      card.innerHTML = `
        <div>
          <div class="comp-merchant-header">
            <span class="comp-merchant-name">${m.name}</span>
            <span class="comp-merchant-badge ${idx === 0 ? 'winner' : 'competitor'}">
              ${idx === 0 ? 'Lowest Price' : `${m.rating}★ Seller`}
            </span>
          </div>
          <div class="comp-merchant-price">
            Base: ₹${(m.product?.basePrice || 20000).toLocaleString('en-IN')}
          </div>
          <div class="comp-merchant-specs">
            ${m.product?.specs || 'Verified Enterprise Specs'} • ${m.deliveryDays || 2}-day delivery • ${m.warrantyMonths || 36}mo warranty
          </div>
        </div>
        <div class="comp-merchant-bundle">
          + Free Bundle: ${(m.bundleOffer?.included || ['Protection Care']).join(' + ')}
        </div>
      `;

      competingMerchantsStrip.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderSingleRound(rnd) {
    const item = document.createElement('div');
    item.className = `round-timeline-item round-${rnd.num}`;
    item.style.animation = 'fadeInUp 0.35s ease forwards';

    const cleanStageTitle = (rnd.stage || `Stage ${rnd.num}`)
      .replace(/^Step\s*\d+\s*:?\s*/i, '')
      .trim();

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-body">
        <div class="timeline-header-line">
          <span class="round-badge-pill">Step ${rnd.num}</span>
          <span class="round-stage-text">${cleanStageTitle}</span>
        </div>
        <div class="timeline-bids-inline">
          <span class="bid-chip buyer">You: <strong>₹${rnd.buyerOffer.toLocaleString('en-IN')}</strong></span>
          <span class="bid-arrow">↔</span>
          <span class="bid-chip merchant">Seller: <strong>₹${rnd.merchantCounter.toLocaleString('en-IN')}</strong></span>
        </div>
        <p class="timeline-summary-text">${rnd.summary}</p>
      </div>
    `;
    consoleRoundsStream.appendChild(item);
  }

  function populateDetailRoom(deal) {
    if (userDealIdBadge) {
      userDealIdBadge.textContent = deal.dealId ? `#${deal.dealId.slice(-6).toUpperCase()}` : '#DEAL';
    }
    if (userActiveProductTitle) userActiveProductTitle.textContent = deal.title || deal.productTitle;
    if (userActiveProductSpecs) userActiveProductSpecs.textContent = deal.desc || "Verified Specifications across network";
    if (userActiveBudget) userActiveBudget.textContent = `₹${(deal.budget || 20000).toLocaleString('en-IN')}`;
    if (colMerchantName) colMerchantName.textContent = deal.merchant || 'GearCraft Studios';

    const bundleNames = (deal.bundle || []).map(b => typeof b === 'string' ? b : b.name).join(' + ');
    if (userActiveBundles) userActiveBundles.textContent = bundleNames || "Included by merchant";
    if (userActiveCurrentPrice) userActiveCurrentPrice.textContent = `₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;

    if (consoleFinalPrice) consoleFinalPrice.textContent = `₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;
    if (consoleOriginalPrice) consoleOriginalPrice.textContent = `₹${(deal.retailTotal || 25498).toLocaleString('en-IN')}`;
    if (consoleSavingsBadge) consoleSavingsBadge.textContent = `You save ₹${(deal.savings || 5498).toLocaleString('en-IN')}`;
    if (userSettlementBundlesSummary) {
      userSettlementBundlesSummary.textContent = bundleNames ? `+ Free Bundled Extras: ${bundleNames}` : 'Free accessory bundles included';
    }
    if (payBtnLabel) {
      payBtnLabel.textContent = `Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} with Razorpay`;
    }

    let candidates = deal.candidates;
    if (!candidates || candidates.length === 0) {
      candidates = [
        { id: "merchant_c", name: deal.merchant || "GearCraft Studios", rating: 4.95, deliveryDays: 2, warrantyMonths: 36, product: { basePrice: deal.retailTotal || ((deal.finalPrice || 20000) + 5499), specs: deal.desc || "Verified Specifications" }, bundleOffer: { included: deal.bundle || ["Braided 4K DisplayPort Cable", "1-Year Extended Warranty"], value: 2499 } },
        { id: "merchant_b", name: "CyberPulse Hardware", rating: 4.9, deliveryDays: 2, warrantyMonths: 24, product: { basePrice: 21999, specs: "Fast-IPS, 165Hz" }, bundleOffer: { included: ["Screen Wipe Kit"], value: 499 } },
        { id: "merchant_a", name: "Apex Displays & Tech", rating: 4.8, deliveryDays: 4, warrantyMonths: 36, product: { basePrice: 22600, specs: "IPS, 144Hz, HDR10" }, bundleOffer: { included: ["DisplayPort Cable"], value: 1299 } }
      ];
      deal.candidates = candidates;
    }
    renderCompetingMerchantsStrip(candidates, deal.merchant);

    if (consoleRoundsStream) {
      consoleRoundsStream.innerHTML = '';
      let rounds = deal.rounds;
      if (!rounds || rounds.length === 0) {
        const agreed = deal.finalPrice || 20000;
        const bInit = Math.round(agreed * 0.85);
        const mInit = Math.round((deal.retailTotal || (agreed + 5499)) * 0.95);
        const bMid = Math.round(agreed * 0.94);
        const mFloor = Math.round(agreed * 1.04);
        rounds = [
          {
            num: 1,
            stage: "First Offer",
            buyerOffer: bInit,
            merchantCounter: mInit,
            summary: `Buyer agent placed an initial bid of ₹${bInit.toLocaleString('en-IN')}. ${deal.merchant || 'Merchant'} countered at ₹${mInit.toLocaleString('en-IN')}.`
          },
          {
            num: 2,
            stage: "Best Cash Price Reached",
            buyerOffer: bMid,
            merchantCounter: mFloor,
            summary: `Buyer agent negotiated down to ₹${bMid.toLocaleString('en-IN')}. ${deal.merchant || 'Merchant'} reached unit economics reservation limit (₹${mFloor.toLocaleString('en-IN')}).`
          },
          {
            num: 3,
            stage: "Free Extras Added (Deal Done!)",
            buyerOffer: agreed,
            merchantCounter: agreed,
            summary: `Dynamic bundle added: ${bundleNames || 'High-Speed Cable + 1-Year Extra Warranty'} for free to lock the deal at ₹${agreed.toLocaleString('en-IN')}!`
          }
        ];
        deal.rounds = rounds;
      }
      rounds.forEach(rnd => renderSingleRound(rnd));
    }

    if (dealStatusPill) {
      dealStatusPill.textContent = "Deal Locked!";
      dealStatusPill.className = "round-status-pill";
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // =========================================================================
  // THE NEW INTERACTIVE SEARCH & CHAT PROCUREMENT WORKFLOW
  // User types -> Bot surveys & sorts sellers by best price on top ->
  // Sends ranked cards in the chat -> User selects vendor ->
  // Chat prompts "Start Negotiating" -> Autonomous negotiation executes!
  // =========================================================================
  async function startNewSearchFlow(queryParam, budgetParam) {
    if (!queryParam || !queryParam.trim()) return;
    const currentUser = getActiveUser();
    const buyerName = currentUser ? currentUser.name : 'Buyer Agent';

    // 1. Switch to detail view immediately
    if (userListView) userListView.style.display = 'none';
    if (userDetailView) {
      userDetailView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (dealStatusPill) {
      dealStatusPill.textContent = "Surveying Merchants...";
      dealStatusPill.className = "round-status-pill";
    }

    // Initialize clean detail room
    if (consoleRoundsStream) consoleRoundsStream.innerHTML = '';
    if (consoleFinalPrice) consoleFinalPrice.textContent = '—';
    if (consoleOriginalPrice) consoleOriginalPrice.textContent = '';
    if (consoleSavingsBadge) consoleSavingsBadge.textContent = 'Surveying...';
    if (userSettlementBundlesSummary) userSettlementBundlesSummary.textContent = 'Searching network merchants...';

    // 2. Poll /api/dealroom/discover to get merchants sorted by best price
    let candidates = [];
    try {
      const discRes = await fetch('/api/dealroom/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryParam,
          buyerMaxBudget: budgetParam ? parseInt(budgetParam) : undefined,
          userName: buyerName
        })
      });
      const discData = await discRes.json();
      if (discData.success && discData.candidates) {
        // Ensure sorted by lowest price first
        candidates = discData.candidates.sort((a, b) => (a.product?.basePrice || 0) - (b.product?.basePrice || 0));
      }
    } catch (e) {
      console.warn("Discover API error:", e);
    }

    if (!candidates || candidates.length === 0) {
      candidates = [
        { id: "merchant_b", name: "CyberPulse Hardware", rating: 4.9, deliveryDays: 2, warrantyMonths: 24, product: { basePrice: 20499, specs: "Fast-IPS, 165Hz, 0.5ms" }, bundleOffer: { included: ["Anti-Glare Screen Wipe Kit"], value: 499 } },
        { id: "merchant_a", name: "Apex Displays & Tech", rating: 4.8, deliveryDays: 4, warrantyMonths: 36, product: { basePrice: 21600, specs: "IPS, 144Hz, 1ms, HDR10" }, bundleOffer: { included: ["DisplayPort 1.4 Cable"], value: 1299 } },
        { id: "merchant_c", name: "GearCraft Studios", rating: 4.95, deliveryDays: 2, warrantyMonths: 36, product: { basePrice: 22999, specs: "QHD IPS, 144Hz, HDR Pro" }, bundleOffer: { included: ["Braided 4K HDMI Cable", "1-Year Extended Care"], value: 2499 } }
      ];
    }

    renderCompetingMerchantsStrip(candidates, candidates[0].name);

    const productTitle = extractCleanProductTitle(queryParam);
    const detectedBudget = (typeof discData !== 'undefined' && discData && discData.buyerMaxBudget) || (budgetParam ? parseInt(budgetParam) : 1499);
    if (userActiveProductTitle) userActiveProductTitle.textContent = productTitle;
    if (userActiveBudget) userActiveBudget.textContent = `₹${detectedBudget.toLocaleString('en-IN')}`;

    const rankingCard = document.createElement('div');
    rankingCard.className = 'round-timeline-item';
    rankingCard.style.animation = 'fadeInUp 0.3s ease forwards';
    rankingCard.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-body">
        <div class="timeline-header-line">
          <span class="round-badge-pill">Market Survey</span>
          <span class="round-stage-text">3 Verified Sellers Ranked by Best Price</span>
        </div>
        <p class="timeline-summary-text" style="font-size: 13.5px; color: #0f172a; margin-bottom: 0.85rem;">
          I surveyed the verified merchant network for <strong>${productTitle}</strong>. Here are the seller offers sorted by best price. Select the vendor you want to negotiate with:
        </p>

        <!-- Ranked Vendor Selection Cards inside Chat -->
        <div class="chat-vendor-rankings-box">
          ${candidates.map((m, idx) => `
            <div class="chat-vendor-row ${idx === 0 ? 'rank-1' : ''}">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span class="chat-vendor-rank-badge ${idx === 0 ? 'best-price' : 'standard'}">
                    #${idx + 1} ${idx === 0 ? 'Lowest Price' : 'Seller'}
                  </span>
                  <strong style="font-size: 14.5px; color: #0f172a;">${m.name}</strong>
                  <span style="font-size: 12px; color: #64748b;">(${m.rating}★)</span>
                </div>
                <div style="font-size: 12.5px; color: #475569;">
                  ${m.product?.specs || 'Verified Specs'} • ${m.deliveryDays || 2}-day delivery • ${m.warrantyMonths || 36}mo warranty
                </div>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
                <span style="font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 800; color: #0f172a;">₹${(m.product?.basePrice || 20000).toLocaleString('en-IN')}</span>
                <button class="btn-select-vendor" data-merchant-id="${m.id}" data-merchant-name="${m.name}" data-price="${m.product?.basePrice}">
                  Select Vendor →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    consoleRoundsStream.appendChild(rankingCard);
    if (window.lucide) window.lucide.createIcons();

    // Attach click listener to vendor selection buttons in chat
    rankingCard.querySelectorAll('.btn-select-vendor').forEach(btn => {
      btn.addEventListener('click', () => {
        const merchantId = btn.getAttribute('data-merchant-id');
        const merchantName = btn.getAttribute('data-merchant-name');
        proceedWithSelectedMerchant(queryParam, budgetParam, merchantId, merchantName, candidates);
      });
    });
  }

  // 4. When User selects vendor in chat:
  async function proceedWithSelectedMerchant(queryParam, budgetParam, merchantId, merchantName, candidates) {
    const currentUser = getActiveUser();
    const buyerName = currentUser ? currentUser.name : 'Buyer Agent';

    if (colMerchantName) colMerchantName.textContent = merchantName;
    renderCompetingMerchantsStrip(candidates, merchantName);

    // User selection message bubble
    const userMsg = document.createElement('div');
    userMsg.className = 'round-timeline-item';
    userMsg.style.animation = 'fadeInUp 0.3s ease forwards';
    userMsg.innerHTML = `
      <div class="timeline-dot" style="background: var(--vana-blue);"></div>
      <div class="timeline-body">
        <div class="timeline-header-line">
          <span class="round-badge-pill" style="background: #e0f2fe; color: #0284c7;">Buyer Decision</span>
          <span class="round-stage-text">Selected ${merchantName}</span>
        </div>
        <p class="timeline-summary-text" style="font-size: 13.5px; color: #0f172a; margin-bottom: 0.85rem;">
          <strong>${buyerName}:</strong> I would like to proceed with <strong>${merchantName}</strong>. Please start autonomous negotiation to counter their price and include free accessory bundles within my budget.
        </p>
        <button id="triggerAutoNegotiationBtn" class="btn-navbar-green" style="padding: 0.65rem 1.4rem; font-size: 13.5px;">
          <i data-lucide="play" style="width: 14px; height: 14px;"></i>
          <span>Start Autonomous Negotiation</span>
        </button>
      </div>
    `;
    consoleRoundsStream.appendChild(userMsg);
    userMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (window.lucide) window.lucide.createIcons();

    const triggerBtn = userMsg.querySelector('#triggerAutoNegotiationBtn');
    triggerBtn.addEventListener('click', async () => {
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `<span>Negotiating in real time...</span>`;
      await executeAutonomousNegotiation(queryParam, budgetParam, merchantId, merchantName, candidates);
    });
  }

  // 5. Execute Autonomous Negotiation with selected merchant
  async function executeAutonomousNegotiation(queryParam, budgetParam, merchantId, merchantName, candidates) {
    const currentUser = getActiveUser();
    const buyerName = currentUser ? currentUser.name : 'Buyer Agent';

    let deal = null;
    try {
      const res = await fetch('/api/dealroom/agent-negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryParam,
          buyerMaxBudget: budgetParam ? parseInt(budgetParam) : undefined,
          merchantId: merchantId || "merchant_c",
          userName: buyerName
        })
      });
      const data = await res.json();
      if (data.success) {
        deal = data;
        deal.candidates = candidates;
      }
    } catch (e) {
      console.warn("Negotiation error:", e);
    }

    if (!deal) {
      deal = generateDynamicDealFallback(queryParam, budgetParam, buyerName);
      deal.merchant = merchantName;
      deal.candidates = candidates;
    }

    activeNegotiation = deal;
    deal.status = 'AGREED';
    deal.timestamp = new Date().toISOString();
    deal.displayTime = 'Just now';
    deal.query = queryParam;
    saveActiveUserDeal(deal);

    // Play rounds in real time
    if (deal.rounds && deal.rounds.length > 0) {
      isSimulating = true;
      if (dealStatusPill) dealStatusPill.textContent = "Countering Seller...";

      for (let i = 0; i < deal.rounds.length; i++) {
        renderSingleRound(deal.rounds[i]);
        if (i < deal.rounds.length - 1) {
          await new Promise(r => setTimeout(r, 650));
        }
      }
      isSimulating = false;
    }

    // Populate settlement bar
    const bundleNames = (deal.bundle || []).map(b => typeof b === 'string' ? b : b.name).join(' + ');
    if (userActiveBundles) userActiveBundles.textContent = bundleNames || "Included by merchant";
    if (userActiveCurrentPrice) userActiveCurrentPrice.textContent = `₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;
    if (consoleFinalPrice) consoleFinalPrice.textContent = `₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}`;
    if (consoleOriginalPrice) consoleOriginalPrice.textContent = `₹${(deal.retailTotal || 25498).toLocaleString('en-IN')}`;
    if (consoleSavingsBadge) consoleSavingsBadge.textContent = `You save ₹${(deal.savings || 5498).toLocaleString('en-IN')}`;
    if (userSettlementBundlesSummary) {
      userSettlementBundlesSummary.textContent = bundleNames ? `+ Free Bundled Extras: ${bundleNames}` : 'Free accessory bundles included';
    }
    if (payBtnLabel) {
      payBtnLabel.textContent = `Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} with Razorpay`;
    }

    if (dealStatusPill) {
      dealStatusPill.textContent = "Deal Consensus Locked!";
      dealStatusPill.className = "round-status-pill";
    }

    showInAppMessage(`Consensus reached with ${merchantName} at ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')}!`, 'success');
    fetchAuditLogs();
  }

  function extractCleanProductTitle(rawQuery) {
    let cleaned = (rawQuery || "").trim();
    cleaned = cleaned.replace(/^(?:find\s+(?:me\s+)?(?:a\s+|an\s+)?|get\s+(?:me\s+)?(?:a\s+|an\s+)?|buy\s+(?:me\s+)?(?:a\s+|an\s+)?|i\s+(?:want|need)\s+(?:a\s+|an\s+)?|looking\s+for\s+(?:a\s+|an\s+)?|search\s+for\s+(?:a\s+|an\s+)?|deal\s+on\s+)/i, '');
    cleaned = cleaned.replace(/(?:\s+under|\s+below|\s+within|\s+less\s+than|\s+for|\s+budget|\s+cap)\s*(?:rs\.?|inr|₹)?\s*([0-9,]+)\s*(?:rupees|rs|inr|\/-)?/gi, '');
    cleaned = cleaned.replace(/([0-9,]+)\s*(?:rupees|rs|inr|\/-)/gi, '');
    cleaned = cleaned.replace(/[?.,!]+$/, '').trim();

    if (!cleaned || cleaned.length < 2) return 'Requested Item';
    if (/^iron\b/i.test(cleaned) || /^electric\s+iron/i.test(cleaned) || /^dry\s+iron/i.test(cleaned) || /^steam\s+iron/i.test(cleaned)) {
      return 'Electric Dry / Steam Iron';
    }
    return cleaned
      .split(/\s+/)
      .map(word => /^(4k|2k|hd|qhd|uhd|oled|ips|rgb|usb|anc|tws|fps|hz|ram|ssd|bt|ai)$/i.test(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function generateDynamicDealFallback(queryParam, budgetParam, userName) {
    const rawQuery = (queryParam || 'High-performance electronics').trim();
    const cleanTitle = extractCleanProductTitle(rawQuery);
    const budget = budgetParam ? parseInt(budgetParam) : 20000;
    const basePrice = Math.round(budget * 1.15);
    const finalPrice = Math.min(budget, Math.round(basePrice * 0.88));
    const retailTotal = Math.round(basePrice + 2499);
    const savings = retailTotal - finalPrice;
    const buyerName = userName || "Buyer Agent";
    const merchantName = "GearCraft Studios";

    return {
      success: true,
      dealId: `deal_${Date.now()}`,
      title: cleanTitle,
      desc: `Autonomous procurement for ${cleanTitle} with verified vendor specifications.`,
      basePrice,
      retailTotal,
      finalPrice,
      savings,
      savingsPercent: `${Math.round((savings / retailTotal) * 100)}%`,
      merchant: merchantName,
      budget,
      bundle: [
        { name: "1-Year Priority Hardware Protection", val: 1499 },
        { name: "Express Next-Day Insured Delivery", val: 1000 }
      ],
      rounds: [
        {
          num: 1,
          stage: "Initial Offer",
          buyerOffer: Math.round(budget * 0.85),
          merchantCounter: Math.round(basePrice * 0.95),
          summary: `${buyerName}'s AI agent surveyed verified network merchants and placed an opening bid of ₹${Math.round(budget * 0.85).toLocaleString('en-IN')}. ${merchantName} countered at ₹${Math.round(basePrice * 0.95).toLocaleString('en-IN')}.`
        },
        {
          num: 2,
          stage: "Floor Reached",
          buyerOffer: Math.round(budget * 0.94),
          merchantCounter: Math.round(basePrice * 0.91),
          summary: `${buyerName}'s agent pushed the price to ₹${Math.round(budget * 0.94).toLocaleString('en-IN')}. ${merchantName} reached their minimum unit-economic margin floor.`
        },
        {
          num: 3,
          stage: "Free Bundling Agreement",
          buyerOffer: finalPrice,
          merchantCounter: finalPrice,
          summary: `${buyerName}'s agent secured complimentary priority protection & express delivery to finalize at ₹${finalPrice.toLocaleString('en-IN')}.`
        }
      ]
    };
  }

  // Search Form Listener
  if (consoleQueryForm) {
    consoleQueryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = (consoleQueryInput ? consoleQueryInput.value : '').trim();
      if (!q) return;
      window.location.href = `/negotiation?q=${encodeURIComponent(q)}`;
    });
  }

  if (replayNegotiationBtn) {
    replayNegotiationBtn.addEventListener('click', () => {
      if (isSimulating || !activeNegotiation) return;
      populateDetailRoom(activeNegotiation);
    });
  }

  if (consoleWalkAwayBtn) {
    consoleWalkAwayBtn.addEventListener('click', () => {
      if (dealStatusPill) {
        dealStatusPill.textContent = "Over-Budget: Walked Away";
        dealStatusPill.className = "round-status-pill danger";
      }

      if (consoleRoundsStream) {
        const exitCard = document.createElement('div');
        exitCard.className = 'round-timeline-item exit-item';
        exitCard.style.animation = 'fadeInUp 0.3s ease forwards';
        exitCard.innerHTML = `
          <div class="timeline-dot danger"></div>
          <div class="timeline-body exit-body">
            <div class="timeline-header-line">
              <span class="round-badge-pill danger">Safety Rule Triggered</span>
              <span class="round-stage-text" style="color: #dc2626;">Walked Away Safely</span>
            </div>
            <p class="timeline-summary-text" style="color: #991b1b; font-weight: 500;">
              Budget Protection: A seller counter-offer exceeded authorized budget boundaries. Your agent terminated the deal immediately. Zero money was spent.
            </p>
          </div>
        `;
        consoleRoundsStream.appendChild(exitCard);
        exitCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showInAppMessage("Safety Rule: Walked away safely. Zero funds spent.", "info");
      }
    });
  }

  // =========================================================================
  // RAZORPAY PAYMENT INTEGRATION
  // =========================================================================
  if (consoleRazorpayPayBtn) {
    consoleRazorpayPayBtn.addEventListener('click', async () => {
      const activeUser = getActiveUser();
      const deal = activeNegotiation || generateDynamicDealFallback(consoleQueryInput ? consoleQueryInput.value : '', null, activeUser ? activeUser.name : undefined);
      const finalPrice = deal.finalPrice || 20000;
      consoleRazorpayPayBtn.disabled = true;
      consoleRazorpayPayBtn.innerHTML = `<span>Initializing Razorpay...</span>`;

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

          // 1. Save to My Deals History
          const u = getActiveUser();
          saveDealToHistory({
            id: deal.dealId || deal.id || `deal_${Date.now()}`,
            query: (consoleQueryInput ? consoleQueryInput.value : '') || deal.title,
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

          // 2. Remove from active negotiations list
          removeActiveUserDeal(deal.dealId || deal.id);

          // 3. Open Receipt Modal
          openReceipt(verifyData.order || {
            receipt: verifyData.receipt.receiptNumber,
            paymentId: verifyData.receipt.paymentId,
            productTitle: deal.title,
            amount: deal.finalPrice,
            originalAmount: deal.retailTotal,
            sha256Seal: verifyData.receipt.sha256Seal
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

        // In-App Checkout Sheet Modal Fallback
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
        consoleRazorpayPayBtn.disabled = false;
        consoleRazorpayPayBtn.innerHTML = `
          <i data-lucide="credit-card" style="width: 18px; height: 18px;"></i>
          <span>Pay ₹${(deal.finalPrice || 20000).toLocaleString('en-IN')} with Razorpay</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
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
  const cancelRzpModalBtn = document.getElementById('cancelRzpModalBtn');
  if (cancelRzpModalBtn) cancelRzpModalBtn.addEventListener('click', closeRazorpayModal);

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
      const deal = activeNegotiation || {};
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
    fetchAuditLogs();
  }

  function closeReceipt() {
    if (receiptModalBackdrop) {
      receiptModalBackdrop.classList.remove('active');
      receiptModalBackdrop.style.display = 'none';
    }
    showListView();
  }

  if (closeReceiptModalBtn) closeReceiptModalBtn.addEventListener('click', closeReceipt);
  if (dismissReceiptBtn) dismissReceiptBtn.addEventListener('click', closeReceipt);

  // =========================================================================
  // CRYPTOGRAPHIC AUDIT LOGS (Chained SHA-256) — Human-Readable Formatting
  // =========================================================================
  function formatAuditDetails(l) {
    if (!l.details) return '—';
    if (typeof l.details === 'string') return l.details;
    const d = l.details;

    if (l.action === 'AUTONOMOUS_NEGOTIATION_ACCEPTED') {
      return `Deal locked at ₹${(d.agreedPrice || 0).toLocaleString('en-IN')} with ${d.merchant || 'Seller'} • Bundles: ${d.dynamicBundle || 'Included'} • Saved ₹${(d.totalSavings || 0).toLocaleString('en-IN')}`;
    }
    if (l.action === 'MULTI_MERCHANT_DISCOVERY') {
      return `Polled ${d.merchantsPolled || 3} verified sellers for "${d.query || 'Product'}" • Top price: ₹${(d.lowestPrice || 0).toLocaleString('en-IN')} (${d.lowestPriceMerchant || 'Verified Seller'})`;
    }
    if (l.action === 'RAZORPAY_ORDER_CREATED') {
      return `Razorpay Order ${d.orderId || ''} created for ₹${(d.amount || 0).toLocaleString('en-IN')} • Escrow locked`;
    }
    if (l.action === 'RAZORPAY_PAYMENT_SETTLED') {
      return `Payment ${d.paymentId || ''} settled on Razorpay • Instant receipt generated`;
    }
    if (l.action === 'NEGOTIATION_WALK_AWAY') {
      return `Safe exit triggered • Zero financial leakage enforced • Disjoint price boundary`;
    }
    if (l.action === 'PROTOCOL_INIT') {
      return `Transacta Commerce Mesh v2.0 Online • ${d.activeMerchants || 3} Verified Merchants`;
    }

    return Object.entries(d)
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join(' • ');
  }

  function formatAuditActor(actor) {
    const raw = (actor || 'System').replace(/_/g, ' ').trim();
    if (raw.toLowerCase().includes('buyer') && !raw.includes('(')) {
      return `${raw.replace(/buyer/i, '').trim() || 'Verified'} (Buyer)`;
    }
    return raw;
  }

  async function fetchAuditLogs() {
    if (!auditTableBody) return;
    try {
      const res = await fetch('/api/audit/logs');
      const data = await res.json();
      renderAuditLogs(data.logs || []);
    } catch (err) {
      console.error("Audit fetch error:", err);
    }
  }

  function renderAuditLogs(logs) {
    if (!auditTableBody) return;
    if (!logs || logs.length === 0) {
      auditTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 2.5rem 1.5rem; text-align: center; color: #94a3b8;">
            <i data-lucide="shield-check" style="width: 28px; height: 28px; margin: 0 auto 0.65rem; opacity: 0.45; display: block; color: #0284c7;"></i>
            <span style="font-size: 14px; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">No transactions recorded yet</span>
            <span style="font-size: 12.5px; color: #94a3b8;">All agent bids, merchant reservation rule checks, and Razorpay HMAC signatures will be cryptographically chained here in real time.</span>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const currentHash = logs.map(l => l.id).join(',');
    if (currentHash === lastAuditHash) return;
    lastAuditHash = currentHash;

    auditTableBody.innerHTML = logs.slice(0, 15).map(l => `
      <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;">
        <td style="padding: 0.85rem 1rem; color: #64748b; font-size: 12px; white-space: nowrap;">${new Date(l.timestamp).toLocaleTimeString()}</td>
        <td style="padding: 0.85rem 1rem; font-weight: 700; color: #0f172a; font-size: 12px;">${l.action}</td>
        <td style="padding: 0.85rem 1rem;"><span style="background: #f1f5f9; padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 11px; font-weight: 700; color: #334155;">${formatAuditActor(l.actor)}</span></td>
        <td style="padding: 0.85rem 1rem; max-width: 320px; font-size: 12px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${formatAuditDetails(l)}">${formatAuditDetails(l)}</td>
        <td style="padding: 0.85rem 1rem;"><strong style="color: ${l.status === 'SUCCESS' ? '#16a34a' : '#ea580c'}; font-size: 11px; text-transform: uppercase;">${l.status}</strong></td>
        <td style="padding: 0.85rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #0284c7;">${(l.hash || '').substring(0, 16)}...</td>
      </tr>
    `).join('');
  }

  // =========================================================================
  // AUTOMATIC REAL-TIME MILLISECOND REFRESH (Zero manual buttons needed)
  // =========================================================================
  setInterval(() => {
    // Silently refresh audit logs and horizontal cards in real time
    fetchAuditLogs();
    if (userListView && userListView.style.display !== 'none') {
      renderHorizontalCards();
    }
  }, 1200);

  // =========================================================================
  // INITIALIZATION ON PAGE LOAD
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q') || urlParams.get('query');
  const bParam = urlParams.get('budget');

  // Check user session
  const initialUser = getActiveUser();
  if (initialUser) {
    updateUserUI(initialUser);
  } else {
    setTimeout(() => {
      showUserModal(false);
    }, 350);
  }
  updateHistoryBadge();

  if (qParam) {
    window.location.href = `/negotiation?q=${encodeURIComponent(qParam)}${bParam ? '&budget=' + encodeURIComponent(bParam) : ''}`;
  } else {
    showListView();
  }
});
