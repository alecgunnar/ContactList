(function() {
  var methods, openModal, shadow, fields, errors, changed, saving;

  errors  = [];
  changed = false;

  methods = {
    // --------------------
    // Initializers
    // --------------------
    init: function() {
      openModal = null;
      shadow    = $('#modal-shadow');

      fields = {
        contact: $('#contact-modal').find('input, select'),
        export: $('#export-modal').find('input, select')
      };

      methods.initModals();
      methods.initMainOptions();

      $('body').on('update', methods.initRowOptions);
    },
    initModals: function() {
      $('.modal').each(function() {
        $(this).css({
          left: (($(window).width() - $(this).width()) / 2) + 'px',
        });

        $(this).find('.close').on('click', function() {
          methods.closeModal();
        });
      });

      $('#contact-modal').find('button#save').on('click', function() {
        methods.saveContact();
      });

      fields.contact.on('change', function() {
        changed = true;
      })
    },
    initMainOptions: function() {
      $('#add-new-contact').on('click', function() {
        methods.openModal('contact-modal');
      });

      $('#export-contacts').on('click', function() {
        methods.openModal('export-modal');
      });
    },
    initRowOptions: function() {
      $('.modify-record').off('click');
      $('.remove-record').off('click');

      $('.modify-record').on('click', function(e) {
        methods.modifyContact($(this).closest('tr'));
      });

      $('.remove-record').on('click', function(e) {
        methods.removeContact($(this).closest('tr'));
      });
    },

    // --------------------
    // Modal events
    // --------------------
    openModal: function(which) {
      if(openModal)
        return;

      changed = false;

      shadow.fadeIn(function() {
        openModal = which;
        $('#' + openModal).fadeIn();
      });
    },
    closeModal: function() {
      if(!openModal)
        return;

      if(methods.clearForm()) {
        $('#' + openModal).fadeOut(function() {
          methods.toggleErrors();
          shadow.fadeOut();
          openModal = null;
        });
      }
    },
    toggleErrors: function() {
      var $errorBox, $ul, i;
      $errorBox = $('#' + openModal).find('.errors');

      if(!errors.length) {
        $errorBox.html('');
        $errorBox.slideUp();
        return;
      }

      $ul = $('<ul></ul>');

      for(i = 0; i < errors.length; i++) {
        $('<li>' + errors[i] + '</li>').appendTo($ul);
      }

      $errorBox.html($ul);
      $errorBox.slideDown();

      errors = [];
    },

    // --------------------
    // Data
    // --------------------
    saveContact: function() {
      if(saving || openModal != 'contact-modal')
        return;

      var data, action;

      methods.toggleErrors();

      data   = methods.getDataFromForm();
      action = data.idx ? 'update' : 'new';

      if(!data.name)
        methods.addError('You must enter a name.');

      if(!data.email)
        methods.addError('You must enter an email address.');

      if(data.position == '')
        methods.addError('You must select a position.');

      if(!errors.length) {
        data.action     = action;
        data.csrf_token = csrf_token;

        saving = true;

        $.ajax({
          url:      'index.php',
          method:   'POST',
          dataType: 'json',
          data:     data,
          success: function() {
            saving  = false;
            changed = false;
            methods.closeModal();
          },
          error: function(resp) {
            console.log(resp.responseText);
            saving = false;
            methods.addError(JSON.parse(resp.responseText).message);
            methods.toggleErrors();
          }
        });
      }

      methods.toggleErrors();
    },
    modifyContact: function(row) {
      $('#contact-modal').find('#idx').val(row.attr('rel'));
      $('#contact-modal').find('#name').val(row.children('.name').text());
      $('#contact-modal').find('#email').val(row.children('.email').text());
      $('#contact-modal').find('#phone').val(row.children('.phone').text());
      $('#contact-modal').find('#position').val(positions.indexOf(row.children('.position').text()));

      methods.openModal('contact-modal');
    },
    removeContact: function(row) {
      $.ajax({
        url:      'index.php',
        method:   'POST',
        dataType: 'json',
        data:     {
          action: 'remove',
          idx:    row.attr('rel')
        },
        success: function() {
          methods.flashNotice('Contact removed.');
        },
        error: function(resp) {
          console.log(resp.responseText);
          methods.flashError(JSON.parse(resp.responseText).message);
        }
      });
    },

    // --------------------
    // Helpers
    // --------------------
    getDataFromForm: function() {
      if(openModal == 'contact-modal') {
        return {
          idx: $('#contact-modal').find('#idx').val(),
          name: $('#contact-modal').find('#name').val(),
          email: $('#contact-modal').find('#email').val(),
          phone: $('#contact-modal').find('#phone').val(),
          position: $('#contact-modal').find('#position').val()
        };
      }
    },
    addError: function(msg) {
      errors[errors.length] = msg;
    },
    clearForm: function() {
      if(openModal == 'contact-modal') {
        if(!changed || confirm("You have unsaved changes.\n\nAre you sure?")) {
          fields.contact.val('');
          return true;
        }

        return false;
      }
    },
    flashError: function(msg) {
      var $box;
      $box = $('.header-messages #error');
      $box.text(msg).fadeIn();

      setTimeout(function() {
        $box.fadeOut();
      }, 5000);
    },
    flashNotice: function(msg) {
      var $box;
      $box = $('.header-messages #notice');
      $box.text(msg).fadeIn();

      setTimeout(function() {
        $box.fadeOut();
      }, 5000);
    }
  };

  $(document).ready(function() {
    methods.init();
  });
})();
