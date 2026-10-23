/**
 * ============================================================================
 * RECALL — Smart Flashcard Learning App
 * CodeNova Internship Project
 * 
 * Features:
 * - Full CRUD Flashcard Management (Create, Read, Update, Delete with confirmation)
 * - 3D CSS Card Flip Animation with Reveal / Hide logic
 * - Session Progress & Unique Card ID Review Tracker
 * - LocalStorage Persistent State Management & Auto-Save
 * - Interactive Dashboard with Real-Time Statistics & Category Breakdown
 * - Real-Time Search & Multi-Criteria Filtering
 * - Full Keyboard Shortcuts (Space, Arrow Keys, Escape)
 * - Web Audio API Synthetic Sound Feedback (Flip, Success, Click)
 * - Elegant Toast Notification System & Responsive Drawer Navigation
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DEFAULT DATA: REAL-WORLD JAVA PROGRAMMING FLASHCARDS
  // ==========================================================================
  const DEFAULT_FLASHCARDS = [
    {
      id: 'card-java-01',
      category: 'JVM & Memory',
      question: 'What is the fundamental difference between Stack and Heap memory in Java?',
      answer: 'Stack memory is used for static memory allocation and the execution of threads. It stores primitive values and references to objects in Heap. It is fast, follows LIFO, and is thread-safe.\n\nHeap memory is used for dynamic memory allocation of objects and JRE classes. All objects created via the "new" keyword reside here, shared across all threads, and managed by Garbage Collection.',
      createdAt: '2025-01-15T10:00:00.000Z'
    },
    {
      id: 'card-java-02',
      category: 'OOP & Design',
      question: 'Explain Compile-time (Static) vs Runtime (Dynamic) Polymorphism in Java.',
      answer: 'Compile-time Polymorphism is achieved via Method Overloading (same method name with different parameters). The method call is resolved at compile time by the compiler.\n\nRuntime Polymorphism is achieved via Method Overriding (subclass providing a specific implementation of a superclass method). The method call is resolved dynamically at runtime using Virtual Method Invocation (vtable).',
      createdAt: '2025-01-16T11:30:00.000Z'
    },
    {
      id: 'card-java-03',
      category: 'Core Java',
      question: 'Why are Strings immutable in Java, and what is the String Constant Pool?',
      answer: 'Strings are immutable for Security (safe for network/DB connections), Thread-safety (can be shared across threads without synchronization), and Caching.\n\nThe String Constant Pool (SCP) is a special storage area in the Java Heap. When a String literal is created, the JVM checks the SCP first: if it already exists, the existing reference is returned, saving substantial memory.',
      createdAt: '2025-01-17T09:15:00.000Z'
    },
    {
      id: 'card-java-04',
      category: 'Collections & Generics',
      question: 'How does HashMap work internally in Java 8+, and what is Treeification?',
      answer: 'HashMap uses an array of Node buckets: Node<K,V>[] table. It computes hash = hash(key.hashCode()) and finds index = (n - 1) & hash.\n\nCollisions are handled using singly linked lists. In Java 8+, when a bucket\'s linked list exceeds TREEIFY_THRESHOLD (8 items) and table capacity >= 64, the linked list converts into a balanced Red-Black Tree, improving lookup worst-case time from O(n) to O(log n).',
      createdAt: '2025-01-18T14:20:00.000Z'
    },
    {
      id: 'card-java-05',
      category: 'Collections & Generics',
      question: 'Compare ArrayList vs LinkedList. When should you choose one over the other?',
      answer: 'ArrayList is backed by a dynamically resizing array. It provides O(1) random access (get/set) but O(n) worst-case insertions/deletions when shifting elements.\n\nLinkedList is implemented as a doubly-linked list. It provides O(1) insertions/deletions at the ends, but O(n) sequential search. Use ArrayList by default; use LinkedList only when high-frequency insertions/removals at both ends are needed.',
      createdAt: '2025-01-19T08:45:00.000Z'
    },
    {
      id: 'card-java-06',
      category: 'OOP & Design',
      question: 'What are the key differences between an Abstract Class and an Interface in modern Java (Java 8/9+)?',
      answer: 'Abstract Class: Can hold state (instance variables), constructors, and partial implementation with any access modifier. A class can extend only one abstract class (single inheritance).\n\nInterface: Represents a contract. Starting in Java 8, interfaces can contain "default" and "static" concrete methods, and Java 9 added "private" helper methods. A class can implement multiple interfaces (multiple inheritance of type).',
      createdAt: '2025-01-20T16:00:00.000Z'
    },
    {
      id: 'card-java-07',
      category: 'Core Java',
      question: 'What is the difference between Checked and Unchecked Exceptions in Java?',
      answer: 'Checked Exceptions (subclasses of Exception excluding RuntimeException): Must be explicitly handled using try-catch or declared with "throws" at compile-time (e.g., IOException, SQLException).\n\nUnchecked Exceptions (subclasses of RuntimeException and Error): Occur at runtime and typically reflect programming bugs (e.g., NullPointerException, ArrayIndexOutOfBoundsException). Handling is optional at compile-time.',
      createdAt: '2025-01-21T12:10:00.000Z'
    },
    {
      id: 'card-java-08',
      category: 'Concurrency & Threads',
      question: 'What is the difference between Runnable and Callable interfaces in Java?',
      answer: 'Runnable: Located in java.lang. Its run() method returns void and cannot throw checked exceptions.\n\nCallable<V>: Introduced in java.util.concurrent (Java 5). Its call() method returns a generic result value of type V and can throw checked Exception. Used with ExecutorService and returns a Future<V> object representing the pending computation.',
      createdAt: '2025-01-22T13:40:00.000Z'
    },
    {
      id: 'card-java-09',
      category: 'JVM & Memory',
      question: 'Describe the Generations of the Java Garbage Collection Heap.',
      answer: 'The Java Heap is divided based on the Weak Generational Hypothesis:\n1. Young Generation: Eden space and two Survivor spaces (S0, S1). Most objects die young and are collected by Minor GC.\n2. Old / Tenured Generation: Objects that survive multiple GC threshold cycles are promoted here. Collected by Major GC / Full GC.\n3. Metaspace (replaced PermGen in Java 8): Stores class metadata outside the Heap in native OS memory.',
      createdAt: '2025-01-23T11:05:00.000Z'
    },
    {
      id: 'card-java-10',
      category: 'Java 8+ Features',
      question: 'Explain Intermediate vs Terminal Operations in the Java Streams API.',
      answer: 'Intermediate Operations: Return a new Stream and are LAZY (executed only when a terminal operation is called). Examples include filter(), map(), sorted(), distinct(), flatMap().\n\nTerminal Operations: Trigger stream pipeline processing and produce a non-stream result (primitive, Collection, or void side-effect). Examples include collect(), count(), forEach(), reduce(), anyMatch(). A stream cannot be reused after a terminal operation.',
      createdAt: '2025-01-24T15:30:00.000Z'
    },
    {
      id: 'card-java-11',
      category: 'Core Java',
      question: 'Differentiate between final, finally, and finalize() in Java.',
      answer: 'final: A keyword used to define constants (final variable), prevent method overriding (final method), or prevent inheritance (final class).\n\nfinally: A code block used in try-catch-finally constructs. It always executes regardless of whether an exception is thrown or caught (used for cleanup/releasing resources).\n\nfinalize(): A protected method of Object class called before an object is garbage collected (deprecated since Java 9 in favor of Cleaner/AutoCloseable).',
      createdAt: '2025-01-25T09:50:00.000Z'
    },
    {
      id: 'card-java-12',
      category: 'Collections & Generics',
      question: 'What is the difference between Comparable and Comparator interfaces?',
      answer: 'Comparable: Located in java.lang. Defines natural ordering for a class by implementing compareTo(T o). Modifies the original class.\n\nComparator: Located in java.util. Defines custom / alternative sorting orders by implementing compare(T o1, T o2) in a separate class or lambda expression. Does not alter the original class.',
      createdAt: '2025-01-26T14:15:00.000Z'
    }
  ];

  // Storage Keys
  const STORAGE_KEYS = {
    FLASHCARDS: 'recall_flashcards',
    SESSION_REVIEWED: 'recall_session_reviewed_ids',
    AUDIO_ENABLED: 'recall_audio_enabled'
  };

  // ==========================================================================
  // 2. APPLICATION STATE
  // ==========================================================================
  const state = {
    cards: [],                    // Array of card objects
    sessionReviewedIds: new Set(),// Unique Card IDs reviewed in current session
    studyFilter: 'ALL',           // Active category filter in study mode
    studyCards: [],               // Filtered cards for active study mode
    currentStudyIndex: 0,         // Index within active studyCards
    isFlipped: false,             // Is the current flashcard showing answer?
    librarySearchQuery: '',       // Search query in library tab
    libraryCategoryFilter: 'ALL', // Category filter in library tab
    librarySort: 'newest',        // Sort criteria in library
    activeTab: 'dashboard',       // Currently active tab
    audioEnabled: true,           // Web audio sound synthesis enabled
    editingCardId: null,          // ID of card currently being edited in modal
    deleteTargetId: null          // ID of card awaiting deletion in confirmation modal
  };

  // ==========================================================================
  // 3. SOUND SYNTHESIZER (Web Audio API - Zero External Dependencies)
  // ==========================================================================
  const SoundFX = {
    ctx: null,
    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      } catch (e) {
        console.warn('Web Audio not supported or blocked by browser policy:', e);
      }
    },
    playTone(frequency, type, duration, gainValue = 0.08) {
      if (!state.audioEnabled || !this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {
        // Silently swallow audio errors
      }
    },
    flip() {
      this.playTone(380, 'sine', 0.12, 0.07);
      setTimeout(() => this.playTone(520, 'sine', 0.14, 0.05), 40);
    },
    navigate() {
      this.playTone(440, 'triangle', 0.08, 0.04);
    },
    success() {
      this.playTone(523.25, 'sine', 0.1, 0.08); // C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.08), 80); // E5
      setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.08), 160); // G5
    },
    delete() {
      this.playTone(280, 'sawtooth', 0.15, 0.06);
    }
  };

  // ==========================================================================
  // 4. DOM ELEMENTS CACHE
  // ==========================================================================
  const DOM = {
    // Navigation & Layout
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    navItems: document.querySelectorAll('.nav-item'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Sidebar Widgets & Stats
    sidebarStudyCount: document.getElementById('sidebarStudyCount'),
    sidebarTotalCount: document.getElementById('sidebarTotalCount'),
    sidebarSessionPercent: document.getElementById('sidebarSessionPercent'),
    sidebarSessionFill: document.getElementById('sidebarSessionFill'),
    sidebarSessionCards: document.getElementById('sidebarSessionCards'),
    sidebarCreateCardBtn: document.getElementById('sidebarCreateCardBtn'),
    btnSidebarResetProgress: document.getElementById('btnSidebarResetProgress'),
    btnSidebarRestoreDefaults: document.getElementById('btnSidebarRestoreDefaults'),
    btnSidebarAudioToggle: document.getElementById('btnSidebarAudioToggle'),
    audioToggleText: document.getElementById('audioToggleText'),

    // Dashboard Elements
    heroStartStudyBtn: document.getElementById('heroStartStudyBtn'),
    heroManageCardsBtn: document.getElementById('heroManageCardsBtn'),
    heroProgressHighlight: document.getElementById('heroProgressHighlight'),
    statTotalCards: document.getElementById('statTotalCards'),
    statCardsReviewed: document.getElementById('statCardsReviewed'),
    statProgressPercent: document.getElementById('statProgressPercent'),
    statProgressFill: document.getElementById('statProgressFill'),
    statReviewedRatio: document.getElementById('statReviewedRatio'),
    statRemainingCards: document.getElementById('statRemainingCards'),
    statCategoriesCount: document.getElementById('statCategoriesCount'),
    dashboardCategoryList: document.getElementById('dashboardCategoryList'),
    dashboardPreviewGrid: document.getElementById('dashboardPreviewGrid'),
    btnViewAllCards: document.getElementById('btnViewAllCards'),

    // Study Mode Elements
    studyCategoryFilter: document.getElementById('studyCategoryFilter'),
    btnShuffleCards: document.getElementById('btnShuffleCards'),
    btnResetSessionInStudy: document.getElementById('btnResetSessionInStudy'),
    studyCardCounter: document.getElementById('studyCardCounter'),
    studyCardStatusBadge: document.getElementById('studyCardStatusBadge'),
    studyProgressBarFill: document.getElementById('studyProgressBarFill'),
    studyProgressText: document.getElementById('studyProgressText'),
    flashcardStage: document.getElementById('flashcardStage'),
    flashcardWrapper: document.getElementById('flashcardWrapper'),
    cardCategoryFront: document.getElementById('cardCategoryFront'),
    cardCategoryBack: document.getElementById('cardCategoryBack'),
    cardIdTagFront: document.getElementById('cardIdTagFront'),
    cardIdTagBack: document.getElementById('cardIdTagBack'),
    cardQuestionText: document.getElementById('cardQuestionText'),
    cardAnswerText: document.getElementById('cardAnswerText'),
    studyEmptyState: document.getElementById('studyEmptyState'),
    studyControlsWrapper: document.getElementById('studyControlsWrapper'),
    btnStudyResetFilter: document.getElementById('btnStudyResetFilter'),
    btnStudyAddNewCard: document.getElementById('btnStudyAddNewCard'),
    btnPrevCard: document.getElementById('btnPrevCard'),
    btnNextCard: document.getElementById('btnNextCard'),
    btnRevealAnswer: document.getElementById('btnRevealAnswer'),
    btnRevealText: document.getElementById('btnRevealText'),

    // Library & Manage Elements
    btnOpenAddModal: document.getElementById('btnOpenAddModal'),
    librarySearchInput: document.getElementById('librarySearchInput'),
    librarySearchClear: document.getElementById('librarySearchClear'),
    libraryCategoryFilter: document.getElementById('libraryCategoryFilter'),
    librarySortFilter: document.getElementById('librarySortFilter'),
    libraryMatchCount: document.getElementById('libraryMatchCount'),
    cardsGrid: document.getElementById('cardsGrid'),
    libraryEmptyState: document.getElementById('libraryEmptyState'),
    libraryEmptyTitle: document.getElementById('libraryEmptyTitle'),
    libraryEmptyDesc: document.getElementById('libraryEmptyDesc'),
    btnResetLibrarySearch: document.getElementById('btnResetLibrarySearch'),
    btnLibraryCreateNew: document.getElementById('btnLibraryCreateNew'),
    btnRestoreDefaultsInline: document.getElementById('btnRestoreDefaultsInline'),

    // Add/Edit Card Modal Elements
    cardModalBackdrop: document.getElementById('cardModalBackdrop'),
    modalCardTitle: document.getElementById('modalCardTitle'),
    modalCardSubtitle: document.getElementById('modalCardSubtitle'),
    modalCardCloseBtn: document.getElementById('modalCardCloseBtn'),
    modalCancelBtn: document.getElementById('modalCancelBtn'),
    cardForm: document.getElementById('cardForm'),
    formCardId: document.getElementById('formCardId'),
    formCategorySelect: document.getElementById('formCategorySelect'),
    customCategoryGroup: document.getElementById('customCategoryGroup'),
    formCustomCategory: document.getElementById('formCustomCategory'),
    customCategoryError: document.getElementById('customCategoryError'),
    formQuestion: document.getElementById('formQuestion'),
    formAnswer: document.getElementById('formAnswer'),
    questionCharCount: document.getElementById('questionCharCount'),
    answerCharCount: document.getElementById('answerCharCount'),
    questionError: document.getElementById('questionError'),
    answerError: document.getElementById('answerError'),
    previewCategoryBadge: document.getElementById('previewCategoryBadge'),
    previewQuestion: document.getElementById('previewQuestion'),
    previewAnswer: document.getElementById('previewAnswer'),
    modalSaveBtnText: document.getElementById('modalSaveBtnText'),

    // Delete Modal Elements
    deleteModalBackdrop: document.getElementById('deleteModalBackdrop'),
    deleteCardPreviewQuote: document.getElementById('deleteCardPreviewQuote'),
    btnCancelDelete: document.getElementById('btnCancelDelete'),
    btnConfirmDelete: document.getElementById('btnConfirmDelete'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // 5. TOAST NOTIFICATION SERVICE
  // ==========================================================================
  function showToast(message, type = 'info', title = null) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    let defaultTitle = 'Notification';

    if (type === 'success') {
      defaultTitle = title || 'Success';
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      defaultTitle = title || 'Error';
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else if (type === 'warning') {
      defaultTitle = title || 'Warning';
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else {
      defaultTitle = title || 'Info';
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${escapeHTML(defaultTitle)}</div>
        <div class="toast-msg">${escapeHTML(message)}</div>
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const removeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', removeToast);

    // Auto-dismiss after 4 seconds
    setTimeout(removeToast, 4000);
  }

  // ==========================================================================
  // 6. PERSISTENCE & STORAGE HELPERS
  // ==========================================================================
  function loadFromStorage() {
    // 1. Load Audio Preference
    const storedAudio = localStorage.getItem(STORAGE_KEYS.AUDIO_ENABLED);
    if (storedAudio !== null) {
      state.audioEnabled = storedAudio === 'true';
    }
    updateAudioToggleButton();

    // 2. Load Flashcards
    try {
      const storedCards = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
      if (storedCards) {
        const parsed = JSON.parse(storedCards);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.cards = parsed;
        } else {
          state.cards = [...DEFAULT_FLASHCARDS];
          saveCardsToStorage();
        }
      } else {
        // Seed default Java flashcards on first visit
        state.cards = [...DEFAULT_FLASHCARDS];
        saveCardsToStorage();
      }
    } catch (e) {
      console.error('Failed to parse cards from LocalStorage:', e);
      state.cards = [...DEFAULT_FLASHCARDS];
      saveCardsToStorage();
    }

    // 3. Load Reviewed IDs
    try {
      const storedReviewed = localStorage.getItem(STORAGE_KEYS.SESSION_REVIEWED);
      if (storedReviewed) {
        const parsedIds = JSON.parse(storedReviewed);
        if (Array.isArray(parsedIds)) {
          // Filter out any IDs that might no longer exist in state.cards
          const validIds = parsedIds.filter(id => state.cards.some(c => c.id === id));
          state.sessionReviewedIds = new Set(validIds);
        }
      }
    } catch (e) {
      state.sessionReviewedIds = new Set();
    }
  }

  function saveCardsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(state.cards));
    } catch (e) {
      console.error('Error saving cards to LocalStorage:', e);
      showToast('Could not save flashcards to browser storage. Storage may be full.', 'error');
    }
  }

  function saveReviewedIdsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION_REVIEWED, JSON.stringify(Array.from(state.sessionReviewedIds)));
    } catch (e) {
      console.error('Error saving reviewed IDs to LocalStorage:', e);
    }
  }

  function saveAudioPreference() {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIO_ENABLED, state.audioEnabled.toString());
    } catch (e) {}
  }

  // ==========================================================================
  // 7. TAB & NAVIGATION ROUTING
  // ==========================================================================
  function switchTab(targetTab) {
    if (state.activeTab === targetTab) return;
    state.activeTab = targetTab;

    // Update Sidebar Navigation
    DOM.navItems.forEach(item => {
      if (item.dataset.tab === targetTab) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Tab Panes
    DOM.tabPanes.forEach(pane => {
      const paneId = pane.id;
      if (paneId === `pane${capitalize(targetTab)}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Close Mobile Menu if open
    closeMobileSidebar();

    // Sound feedback
    SoundFX.navigate();

    // Re-render target pane
    if (targetTab === 'dashboard') {
      renderDashboard();
    } else if (targetTab === 'study') {
      updateStudyDeck();
      renderStudyCard();
    } else if (targetTab === 'manage') {
      renderLibrary();
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleMobileSidebar() {
    DOM.sidebar.classList.toggle('mobile-open');
    DOM.sidebarBackdrop.classList.toggle('active');
  }

  function closeMobileSidebar() {
    DOM.sidebar.classList.remove('mobile-open');
    DOM.sidebarBackdrop.classList.remove('active');
  }

  function updateAudioToggleButton() {
    if (DOM.audioToggleText) {
      DOM.audioToggleText.textContent = state.audioEnabled ? 'Sound Effects: On' : 'Sound Effects: Off';
    }
  }

  // ==========================================================================
  // 8. DASHBOARD RENDERING & ANALYTICS
  // ==========================================================================
  function renderDashboard() {
    const total = state.cards.length;
    // Calculate accurately using unique card IDs
    const reviewedCount = Array.from(state.sessionReviewedIds).filter(id => 
      state.cards.some(c => c.id === id)
    ).length;
    
    const percentage = total > 0 ? Math.round((reviewedCount / total) * 100) : 0;
    const remaining = Math.max(0, total - reviewedCount);

    // Extract unique categories
    const categoriesMap = {};
    state.cards.forEach(card => {
      const cat = card.category || 'General';
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });
    const uniqueCategoryCount = Object.keys(categoriesMap).length;

    // Update Stat Cards
    DOM.statTotalCards.textContent = total;
    DOM.statCardsReviewed.textContent = reviewedCount;
    DOM.statProgressPercent.textContent = `${percentage}%`;
    DOM.statProgressFill.style.width = `${percentage}%`;
    DOM.statReviewedRatio.textContent = `${reviewedCount} of ${total}`;
    DOM.statRemainingCards.textContent = `${remaining} card${remaining === 1 ? '' : 's'} left`;
    DOM.statCategoriesCount.textContent = `${uniqueCategoryCount} Categor${uniqueCategoryCount === 1 ? 'y' : 'ies'}`;
    DOM.heroProgressHighlight.textContent = `${percentage}%`;

    // Update Sidebar Widget
    DOM.sidebarStudyCount.textContent = total;
    DOM.sidebarTotalCount.textContent = total;
    DOM.sidebarSessionPercent.textContent = `${percentage}%`;
    DOM.sidebarSessionFill.style.width = `${percentage}%`;
    DOM.sidebarSessionCards.textContent = `${reviewedCount} / ${total} Reviewed`;

    // Render Topic Breakdown
    renderTopicBreakdown(categoriesMap, total);

    // Render Recent Cards Preview
    renderDashboardPreview();
  }

  function renderTopicBreakdown(categoriesMap, total) {
    DOM.dashboardCategoryList.innerHTML = '';
    const categories = Object.keys(categoriesMap);

    if (categories.length === 0) {
      DOM.dashboardCategoryList.innerHTML = `
        <div class="empty-state-text" style="font-size: 0.85rem; color: var(--text-muted); padding: 1rem 0;">
          No categories available. Add your first flashcard to get started!
        </div>
      `;
      return;
    }

    // Sort categories by card count descending
    categories.sort((a, b) => categoriesMap[b] - categoriesMap[a]);

    categories.forEach(cat => {
      const count = categoriesMap[cat];
      const catPercent = total > 0 ? Math.round((count / total) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'category-breakdown-row';
      row.innerHTML = `
        <div class="category-name-badge" title="${escapeHTML(cat)}">${escapeHTML(cat)}</div>
        <div class="category-bar-wrap">
          <div class="category-bar-fill" style="width: ${catPercent}%;"></div>
        </div>
        <div class="category-count-label">${count} card${count === 1 ? '' : 's'}</div>
      `;
      DOM.dashboardCategoryList.appendChild(row);
    });
  }

  function renderDashboardPreview() {
    DOM.dashboardPreviewGrid.innerHTML = '';
    const previewCards = state.cards.slice(0, 3);

    if (previewCards.length === 0) {
      DOM.dashboardPreviewGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.88rem;">
          Your deck is currently empty. Click "New Flashcard" to create your first card!
        </div>
      `;
      return;
    }

    previewCards.forEach((card, index) => {
      const isReviewed = state.sessionReviewedIds.has(card.id);
      const item = document.createElement('div');
      item.className = 'preview-card-item';
      item.innerHTML = `
        <div class="preview-card-top">
          <span class="category-badge">${escapeHTML(card.category)}</span>
          <span class="tracker-status-pill ${isReviewed ? 'reviewed' : ''}">
            ${isReviewed ? '✓ Reviewed' : 'Pending'}
          </span>
        </div>
        <div class="preview-card-question">${formatFormattedCode(card.question)}</div>
        <div class="preview-card-answer">${formatFormattedCode(card.answer)}</div>
      `;

      item.addEventListener('click', () => {
        // Jump directly to this card in study mode
        state.studyFilter = 'ALL';
        DOM.studyCategoryFilter.value = 'ALL';
        updateStudyDeck();
        const foundIndex = state.studyCards.findIndex(c => c.id === card.id);
        if (foundIndex !== -1) {
          state.currentStudyIndex = foundIndex;
        }
        switchTab('study');
      });

      DOM.dashboardPreviewGrid.appendChild(item);
    });
  }

  // ==========================================================================
  // 9. STUDY MODE (3D FLIP, CONTROLS & REVIEW TRACKING)
  // ==========================================================================
  function populateStudyCategoryDropdown() {
    const currentVal = DOM.studyCategoryFilter.value || 'ALL';
    const categories = Array.from(new Set(state.cards.map(c => c.category || 'General'))).sort();

    DOM.studyCategoryFilter.innerHTML = `<option value="ALL">All Topics (${state.cards.length})</option>`;

    categories.forEach(cat => {
      const count = state.cards.filter(c => c.category === cat).length;
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${cat} (${count})`;
      DOM.studyCategoryFilter.appendChild(opt);
    });

    if (categories.includes(currentVal) || currentVal === 'ALL') {
      DOM.studyCategoryFilter.value = currentVal;
    } else {
      DOM.studyCategoryFilter.value = 'ALL';
      state.studyFilter = 'ALL';
    }
  }

  function updateStudyDeck() {
    populateStudyCategoryDropdown();

    if (state.studyFilter === 'ALL') {
      state.studyCards = [...state.cards];
    } else {
      state.studyCards = state.cards.filter(c => c.category === state.studyFilter);
    }

    if (state.currentStudyIndex >= state.studyCards.length) {
      state.currentStudyIndex = Math.max(0, state.studyCards.length - 1);
    }
  }

  function renderStudyCard() {
    const total = state.studyCards.length;

    // Reset flipped state visually when rendering new card
    state.isFlipped = false;
    DOM.flashcardWrapper.classList.remove('flipped');
    updateRevealButtonText();

    if (total === 0) {
      // Show Empty State
      DOM.flashcardStage.classList.add('hidden');
      DOM.studyControlsWrapper.classList.add('hidden');
      DOM.studyEmptyState.classList.remove('hidden');
      DOM.studyCardCounter.textContent = '0 cards';
      DOM.studyCardStatusBadge.textContent = 'Empty';
      DOM.studyCardStatusBadge.className = 'tracker-status-pill';
      DOM.studyProgressBarFill.style.width = '0%';
      DOM.studyProgressText.textContent = '0% Progress';
      return;
    }

    DOM.flashcardStage.classList.remove('hidden');
    DOM.studyControlsWrapper.classList.remove('hidden');
    DOM.studyEmptyState.classList.add('hidden');

    const card = state.studyCards[state.currentStudyIndex];
    const isReviewed = state.sessionReviewedIds.has(card.id);

    // Update Card Contents (Front & Back)
    DOM.cardCategoryFront.textContent = card.category;
    DOM.cardCategoryBack.textContent = card.category;
    DOM.cardIdTagFront.textContent = `#${card.id.slice(-6).toUpperCase()}`;
    DOM.cardIdTagBack.textContent = `#${card.id.slice(-6).toUpperCase()}`;

    DOM.cardQuestionText.innerHTML = formatFormattedCode(card.question);
    DOM.cardAnswerText.innerHTML = formatMarkdownAnswer(card.answer);

    // Update Tracker & Counters
    DOM.studyCardCounter.textContent = `Card ${state.currentStudyIndex + 1} of ${total}`;

    if (isReviewed) {
      DOM.studyCardStatusBadge.textContent = '✓ Reviewed in this session';
      DOM.studyCardStatusBadge.className = 'tracker-status-pill reviewed';
    } else {
      DOM.studyCardStatusBadge.textContent = 'Not Reviewed Yet';
      DOM.studyCardStatusBadge.className = 'tracker-status-pill';
    }

    const stepPercentage = Math.round(((state.currentStudyIndex + 1) / total) * 100);
    DOM.studyProgressBarFill.style.width = `${stepPercentage}%`;
    DOM.studyProgressText.textContent = `${stepPercentage}% Deck Progress`;

    // Update Nav Buttons State
    DOM.btnPrevCard.disabled = (total <= 1);
    DOM.btnNextCard.disabled = (total <= 1);
  }

  function flipFlashcard() {
    if (state.studyCards.length === 0) return;

    state.isFlipped = !state.isFlipped;
    DOM.flashcardWrapper.classList.toggle('flipped', state.isFlipped);
    updateRevealButtonText();

    SoundFX.flip();

    // If flipping to reveal the answer, automatically mark card as reviewed in this session!
    if (state.isFlipped) {
      markCurrentCardAsReviewed();
    }
  }

  function updateRevealButtonText() {
    if (state.isFlipped) {
      DOM.btnRevealText.textContent = 'Hide Answer';
      DOM.btnRevealAnswer.classList.remove('btn-primary');
      DOM.btnRevealAnswer.classList.add('btn-secondary');
    } else {
      DOM.btnRevealText.textContent = 'Reveal Answer';
      DOM.btnRevealAnswer.classList.remove('btn-secondary');
      DOM.btnRevealAnswer.classList.add('btn-primary');
    }
  }

  function markCurrentCardAsReviewed() {
    if (state.studyCards.length === 0) return;
    const card = state.studyCards[state.currentStudyIndex];
    if (!card) return;

    if (!state.sessionReviewedIds.has(card.id)) {
      state.sessionReviewedIds.add(card.id);
      saveReviewedIdsToStorage();

      // Update badge
      DOM.studyCardStatusBadge.textContent = '✓ Reviewed in this session';
      DOM.studyCardStatusBadge.className = 'tracker-status-pill reviewed';

      // Update Dashboard & Sidebar widgets reactively
      renderDashboard();
    }
  }

  function nextFlashcard() {
    if (state.studyCards.length <= 1) return;
    state.currentStudyIndex = (state.currentStudyIndex + 1) % state.studyCards.length;
    SoundFX.navigate();
    renderStudyCard();
  }

  function prevFlashcard() {
    if (state.studyCards.length <= 1) return;
    state.currentStudyIndex = (state.currentStudyIndex - 1 + state.studyCards.length) % state.studyCards.length;
    SoundFX.navigate();
    renderStudyCard();
  }

  function shuffleStudyCards() {
    if (state.studyCards.length <= 1) {
      showToast('Need at least 2 cards to shuffle.', 'info');
      return;
    }

    // Fisher-Yates shuffle
    for (let i = state.studyCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.studyCards[i], state.studyCards[j]] = [state.studyCards[j], state.studyCards[i]];
    }

    state.currentStudyIndex = 0;
    SoundFX.flip();
    renderStudyCard();
    showToast('Cards shuffled successfully!', 'info');
  }

  function resetSessionProgress() {
    state.sessionReviewedIds.clear();
    saveReviewedIdsToStorage();
    renderDashboard();
    renderStudyCard();
    SoundFX.navigate();
    showToast('Study session progress reset to 0%.', 'info');
  }

  // ==========================================================================
  // 10. LIBRARY & MANAGE FLASHCARDS
  // ==========================================================================
  function populateLibraryCategoryDropdown() {
    const currentVal = DOM.libraryCategoryFilter.value || 'ALL';
    const categories = Array.from(new Set(state.cards.map(c => c.category || 'General'))).sort();

    DOM.libraryCategoryFilter.innerHTML = '<option value="ALL">All Categories</option>';

    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      DOM.libraryCategoryFilter.appendChild(opt);
    });

    if (categories.includes(currentVal) || currentVal === 'ALL') {
      DOM.libraryCategoryFilter.value = currentVal;
    } else {
      DOM.libraryCategoryFilter.value = 'ALL';
      state.libraryCategoryFilter = 'ALL';
    }
  }

  function renderLibrary() {
    populateLibraryCategoryDropdown();

    const query = state.librarySearchQuery.trim().toLowerCase();
    const category = state.libraryCategoryFilter;
    const sort = state.librarySort;

    // 1. Filter
    let filtered = state.cards.filter(card => {
      const matchesCategory = (category === 'ALL' || card.category === category);
      const matchesSearch = query === '' ||
        card.question.toLowerCase().includes(query) ||
        card.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (sort === 'az') {
        return a.question.localeCompare(b.question);
      } else if (sort === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      } else {
        // Newest first by default
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    // Update count summary
    DOM.libraryMatchCount.textContent = `Showing ${filtered.length} of ${state.cards.length} flashcards`;

    // Clear search button visibility
    DOM.librarySearchClear.classList.toggle('hidden', query === '');

    // Render cards or empty state
    DOM.cardsGrid.innerHTML = '';

    if (filtered.length === 0) {
      DOM.cardsGrid.classList.add('hidden');
      DOM.libraryEmptyState.classList.remove('hidden');

      if (state.cards.length === 0) {
        DOM.libraryEmptyTitle.textContent = 'No Flashcards in Deck';
        DOM.libraryEmptyDesc.textContent = 'Your flashcard collection is currently empty. Click below to restore default Java cards or add your own!';
        DOM.btnResetLibrarySearch.textContent = 'Restore Java Defaults';
      } else {
        DOM.libraryEmptyTitle.textContent = 'No Matching Flashcards';
        DOM.libraryEmptyDesc.textContent = `We couldn't find any flashcards matching "${escapeHTML(query)}". Try different keywords or clear the category filter.`;
        DOM.btnResetLibrarySearch.textContent = 'Clear Search & Filters';
      }
      return;
    }

    DOM.cardsGrid.classList.remove('hidden');
    DOM.libraryEmptyState.classList.add('hidden');

    filtered.forEach(card => {
      const isReviewed = state.sessionReviewedIds.has(card.id);
      const cardEl = document.createElement('div');
      cardEl.className = 'library-card';
      cardEl.dataset.cardId = card.id;

      cardEl.innerHTML = `
        <div class="card-top-bar">
          <span class="category-badge">${escapeHTML(card.category)}</span>
          <span class="tracker-status-pill ${isReviewed ? 'reviewed' : ''}">
            ${isReviewed ? '✓ Reviewed' : 'Pending'}
          </span>
        </div>

        <h4 class="library-card-question">${formatFormattedCode(card.question)}</h4>

        <div class="library-card-answer">
          ${formatMarkdownAnswer(card.answer)}
        </div>

        <div class="library-card-footer">
          <span class="card-date">${formatDate(card.createdAt)}</span>
          <div class="card-actions">
            <button class="btn-card-action edit-card-btn" title="Edit flashcard" aria-label="Edit card">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>
            <button class="btn-card-action danger delete-card-btn" title="Delete flashcard" aria-label="Delete card">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      // Event Listeners for Edit & Delete buttons
      cardEl.querySelector('.edit-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openEditCardModal(card.id);
      });

      cardEl.querySelector('.delete-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openDeleteModal(card.id);
      });

      DOM.cardsGrid.appendChild(cardEl);
    });
  }

  // ==========================================================================
  // 11. CREATE & EDIT FLASHCARD MODAL
  // ==========================================================================
  function openCreateCardModal() {
    state.editingCardId = null;
    DOM.modalCardTitle.textContent = 'Create New Flashcard';
    DOM.modalCardSubtitle.textContent = 'Add a new technical concept to your study deck';
    DOM.modalSaveBtnText.textContent = 'Save Flashcard';
    DOM.formCardId.value = '';

    DOM.cardForm.reset();
    resetValidationErrors();

    DOM.customCategoryGroup.classList.add('hidden');
    DOM.formCategorySelect.value = 'Core Java';

    updateCharCounts();
    updateLivePreview();

    DOM.cardModalBackdrop.classList.add('open');
    setTimeout(() => DOM.formQuestion.focus(), 100);
  }

  function openEditCardModal(cardId) {
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return;

    state.editingCardId = cardId;
    DOM.modalCardTitle.textContent = 'Edit Flashcard';
    DOM.modalCardSubtitle.textContent = 'Update question, answer, or category details';
    DOM.modalSaveBtnText.textContent = 'Update Flashcard';
    DOM.formCardId.value = card.id;

    resetValidationErrors();

    // Check if category is standard or custom
    const standardOptions = Array.from(DOM.formCategorySelect.options).map(o => o.value);
    if (standardOptions.includes(card.category)) {
      DOM.formCategorySelect.value = card.category;
      DOM.customCategoryGroup.classList.add('hidden');
      DOM.formCustomCategory.value = '';
    } else {
      DOM.formCategorySelect.value = 'CUSTOM';
      DOM.customCategoryGroup.classList.remove('hidden');
      DOM.formCustomCategory.value = card.category;
    }

    DOM.formQuestion.value = card.question;
    DOM.formAnswer.value = card.answer;

    updateCharCounts();
    updateLivePreview();

    DOM.cardModalBackdrop.classList.add('open');
    setTimeout(() => DOM.formQuestion.focus(), 100);
  }

  function closeCardModal() {
    DOM.cardModalBackdrop.classList.remove('open');
    state.editingCardId = null;
  }

  function resetValidationErrors() {
    DOM.questionError.classList.remove('show');
    DOM.answerError.classList.remove('show');
    DOM.customCategoryError.classList.remove('show');
    DOM.formQuestion.classList.remove('invalid');
    DOM.formAnswer.classList.remove('invalid');
    DOM.formCustomCategory.classList.remove('invalid');
  }

  function updateCharCounts() {
    const qLen = DOM.formQuestion.value.length;
    const aLen = DOM.formAnswer.value.length;
    DOM.questionCharCount.textContent = `${qLen} / 300`;
    DOM.answerCharCount.textContent = `${aLen} / 800`;
  }

  function updateLivePreview() {
    let cat = DOM.formCategorySelect.value;
    if (cat === 'CUSTOM') {
      cat = DOM.formCustomCategory.value.trim() || 'Custom Category';
    }
    DOM.previewCategoryBadge.textContent = cat;

    const q = DOM.formQuestion.value.trim();
    DOM.previewQuestion.innerHTML = q ? formatFormattedCode(q) : 'Question will appear here...';

    const a = DOM.formAnswer.value.trim();
    DOM.previewAnswer.innerHTML = a ? formatMarkdownAnswer(a) : 'Answer preview will appear here...';
  }

  function handleCardFormSubmit(e) {
    e.preventDefault();

    resetValidationErrors();

    let category = DOM.formCategorySelect.value;
    if (category === 'CUSTOM') {
      category = DOM.formCustomCategory.value.trim();
      if (!category) {
        DOM.customCategoryError.classList.add('show');
        DOM.formCustomCategory.classList.add('invalid');
        DOM.formCustomCategory.focus();
        return;
      }
    }

    const question = DOM.formQuestion.value.trim();
    const answer = DOM.formAnswer.value.trim();
    let hasError = false;

    if (question.length < 5) {
      DOM.questionError.classList.add('show');
      DOM.formQuestion.classList.add('invalid');
      if (!hasError) DOM.formQuestion.focus();
      hasError = true;
    }

    if (answer.length < 10) {
      DOM.answerError.classList.add('show');
      DOM.formAnswer.classList.add('invalid');
      if (!hasError) DOM.formAnswer.focus();
      hasError = true;
    }

    if (hasError) return;

    if (state.editingCardId) {
      // Update existing card
      const cardIndex = state.cards.findIndex(c => c.id === state.editingCardId);
      if (cardIndex !== -1) {
        state.cards[cardIndex].category = category;
        state.cards[cardIndex].question = question;
        state.cards[cardIndex].answer = answer;
        state.cards[cardIndex].updatedAt = new Date().toISOString();

        saveCardsToStorage();
        closeCardModal();
        SoundFX.success();
        showToast('Flashcard updated successfully!', 'success');
      }
    } else {
      // Create new card
      const newCard = {
        id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        category: category,
        question: question,
        answer: answer,
        createdAt: new Date().toISOString()
      };

      state.cards.unshift(newCard);
      saveCardsToStorage();
      closeCardModal();
      SoundFX.success();
      showToast('New flashcard created successfully!', 'success');
    }

    // Refresh active views
    renderDashboard();
    updateStudyDeck();
    renderStudyCard();
    renderLibrary();
  }

  // ==========================================================================
  // 12. DELETE FLASHCARD WITH MODAL CONFIRMATION
  // ==========================================================================
  function openDeleteModal(cardId) {
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return;

    state.deleteTargetId = cardId;
    DOM.deleteCardPreviewQuote.textContent = `"${card.question}"`;
    DOM.deleteModalBackdrop.classList.add('open');
  }

  function closeDeleteModal() {
    DOM.deleteModalBackdrop.classList.remove('open');
    state.deleteTargetId = null;
  }

  function confirmDeleteCard() {
    if (!state.deleteTargetId) return;

    const cardId = state.deleteTargetId;
    state.cards = state.cards.filter(c => c.id !== cardId);
    state.sessionReviewedIds.delete(cardId);

    saveCardsToStorage();
    saveReviewedIdsToStorage();

    closeDeleteModal();
    SoundFX.delete();
    showToast('Flashcard permanently deleted.', 'warning');

    // Re-render
    renderDashboard();
    updateStudyDeck();
    renderStudyCard();
    renderLibrary();
  }

  // ==========================================================================
  // 13. RESTORE DEFAULT FLASHCARDS
  // ==========================================================================
  function restoreDefaultCards() {
    if (confirm('Restore the 12 default Java programming flashcards? Your current deck will be reset to default.')) {
      state.cards = JSON.parse(JSON.stringify(DEFAULT_FLASHCARDS));
      state.sessionReviewedIds.clear();
      saveCardsToStorage();
      saveReviewedIdsToStorage();

      renderDashboard();
      updateStudyDeck();
      renderStudyCard();
      renderLibrary();

      SoundFX.success();
      showToast('Deck restored to default Java flashcards!', 'success');
    }
  }

  // ==========================================================================
  // 14. KEYBOARD NAVIGATION HANDLER
  // ==========================================================================
  function handleGlobalKeyDown(e) {
    // If a modal is open, handle Escape
    if (DOM.cardModalBackdrop.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeCardModal();
      }
      return;
    }

    if (DOM.deleteModalBackdrop.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeDeleteModal();
      }
      return;
    }

    // If an input/textarea is currently focused, do not intercept typing
    const activeTagName = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTagName === 'input' || activeTagName === 'textarea' || activeTagName === 'select') {
      return;
    }

    // Only process study shortcuts if Study tab is active
    if (state.activeTab === 'study') {
      if (e.code === 'Space') {
        e.preventDefault();
        flipFlashcard();
      } else if (e.key === 'ArrowRight' || e.key === 'KeyN') {
        e.preventDefault();
        nextFlashcard();
      } else if (e.key === 'ArrowLeft' || e.key === 'KeyP') {
        e.preventDefault();
        prevFlashcard();
      } else if (e.key === 'KeyM' || e.key === 'm') {
        e.preventDefault();
        markCurrentCardAsReviewed();
        showToast('Card marked as reviewed for this session.', 'info');
      }
    }
  }

  // ==========================================================================
  // 15. STRING FORMATTING & UTILITIES
  // ==========================================================================
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatFormattedCode(text) {
    if (!text) return '';
    const escaped = escapeHTML(text);
    // Replace `code` backtick phrases with <code> tags
    return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function formatMarkdownAnswer(text) {
    if (!text) return '';
    const formatted = formatFormattedCode(text);

    // Split paragraphs by double newline
    const paragraphs = formatted.split(/\n\s*\n/);
    return paragraphs.map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      // Support numbered list items
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split(/\n/).map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('');
        return `<ol>${items}</ol>`;
      }
      // Support bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const items = trimmed.split(/\n/).map(line => `<li>${line.replace(/^[-•]\s*/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatDate(isoString) {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  }

  // ==========================================================================
  // 16. EVENT LISTENERS INITIALIZATION
  // ==========================================================================
  function attachEventListeners() {
    // Audio Context Initializer on first user interaction
    const initAudioOnce = () => {
      SoundFX.init();
      document.removeEventListener('click', initAudioOnce);
      document.removeEventListener('keydown', initAudioOnce);
    };
    document.addEventListener('click', initAudioOnce);
    document.addEventListener('keydown', initAudioOnce);

    // Mobile Menu Toggle
    DOM.mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
    DOM.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // Tab Navigation
    DOM.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        if (tab) switchTab(tab);
      });
    });

    // Sidebar Action Buttons
    DOM.sidebarCreateCardBtn.addEventListener('click', openCreateCardModal);
    DOM.btnSidebarResetProgress.addEventListener('click', resetSessionProgress);
    DOM.btnSidebarRestoreDefaults.addEventListener('click', restoreDefaultCards);
    DOM.btnSidebarAudioToggle.addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      saveAudioPreference();
      updateAudioToggleButton();
      showToast(`Sound feedback ${state.audioEnabled ? 'enabled' : 'disabled'}.`, 'info');
    });

    // Hero Actions on Dashboard
    DOM.heroStartStudyBtn.addEventListener('click', () => switchTab('study'));
    DOM.heroManageCardsBtn.addEventListener('click', () => switchTab('manage'));
    DOM.btnViewAllCards.addEventListener('click', () => switchTab('manage'));

    // Study Mode Events
    DOM.flashcardWrapper.addEventListener('click', flipFlashcard);
    DOM.flashcardWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipFlashcard();
      }
    });

    DOM.btnRevealAnswer.addEventListener('click', (e) => {
      e.stopPropagation();
      flipFlashcard();
    });

    DOM.btnNextCard.addEventListener('click', nextFlashcard);
    DOM.btnPrevCard.addEventListener('click', prevFlashcard);
    DOM.btnShuffleCards.addEventListener('click', shuffleStudyCards);
    DOM.btnResetSessionInStudy.addEventListener('click', resetSessionProgress);

    DOM.studyCategoryFilter.addEventListener('change', (e) => {
      state.studyFilter = e.target.value;
      state.currentStudyIndex = 0;
      updateStudyDeck();
      renderStudyCard();
    });

    DOM.btnStudyResetFilter.addEventListener('click', () => {
      state.studyFilter = 'ALL';
      DOM.studyCategoryFilter.value = 'ALL';
      updateStudyDeck();
      renderStudyCard();
    });

    DOM.btnStudyAddNewCard.addEventListener('click', openCreateCardModal);

    // Library & Manage Events
    DOM.btnOpenAddModal.addEventListener('click', openCreateCardModal);
    DOM.btnLibraryCreateNew.addEventListener('click', openCreateCardModal);
    DOM.btnRestoreDefaultsInline.addEventListener('click', restoreDefaultCards);

    DOM.librarySearchInput.addEventListener('input', (e) => {
      state.librarySearchQuery = e.target.value;
      renderLibrary();
    });

    DOM.librarySearchClear.addEventListener('click', () => {
      state.librarySearchQuery = '';
      DOM.librarySearchInput.value = '';
      renderLibrary();
    });

    DOM.libraryCategoryFilter.addEventListener('change', (e) => {
      state.libraryCategoryFilter = e.target.value;
      renderLibrary();
    });

    DOM.librarySortFilter.addEventListener('change', (e) => {
      state.librarySort = e.target.value;
      renderLibrary();
    });

    DOM.btnResetLibrarySearch.addEventListener('click', () => {
      if (state.cards.length === 0) {
        restoreDefaultCards();
      } else {
        state.librarySearchQuery = '';
        state.libraryCategoryFilter = 'ALL';
        DOM.librarySearchInput.value = '';
        DOM.libraryCategoryFilter.value = 'ALL';
        renderLibrary();
      }
    });

    // Add / Edit Modal Events
    DOM.modalCardCloseBtn.addEventListener('click', closeCardModal);
    DOM.modalCancelBtn.addEventListener('click', closeCardModal);
    DOM.cardModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.cardModalBackdrop) closeCardModal();
    });

    DOM.formCategorySelect.addEventListener('change', (e) => {
      if (e.target.value === 'CUSTOM') {
        DOM.customCategoryGroup.classList.remove('hidden');
        DOM.formCustomCategory.focus();
      } else {
        DOM.customCategoryGroup.classList.add('hidden');
      }
      updateLivePreview();
    });

    DOM.formCustomCategory.addEventListener('input', updateLivePreview);
    DOM.formQuestion.addEventListener('input', () => {
      updateCharCounts();
      updateLivePreview();
      if (DOM.formQuestion.value.trim().length >= 5) {
        DOM.questionError.classList.remove('show');
        DOM.formQuestion.classList.remove('invalid');
      }
    });

    DOM.formAnswer.addEventListener('input', () => {
      updateCharCounts();
      updateLivePreview();
      if (DOM.formAnswer.value.trim().length >= 10) {
        DOM.answerError.classList.remove('show');
        DOM.formAnswer.classList.remove('invalid');
      }
    });

    DOM.cardForm.addEventListener('submit', handleCardFormSubmit);

    // Delete Modal Events
    DOM.btnCancelDelete.addEventListener('click', closeDeleteModal);
    DOM.btnConfirmDelete.addEventListener('click', confirmDeleteCard);
    DOM.deleteModalBackdrop.addEventListener('click', (e) => {
      if (e.target === DOM.deleteModalBackdrop) closeDeleteModal();
    });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', handleGlobalKeyDown);
  }

  // ==========================================================================
  // 17. APP INITIALIZATION ENTRYPOINT
  // ==========================================================================
  function initApp() {
    loadFromStorage();
    attachEventListeners();

    // Initial renders
    renderDashboard();
    updateStudyDeck();
    renderStudyCard();
    renderLibrary();

    console.log('Recall — Smart Flashcard Learning App initialized successfully.');
  }

  // Kickstart after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
