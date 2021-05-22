'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url('Newsletter-Subscribe').toString();
    var newsletterForm = server.forms.getForm('newsletter');
    newsletterForm.clear();
    res.render('/newsletter/newsletter', {
        actionURL: actionUrl,
        newsletterForm: newsletterForm
    });
    next();
});

server.post('Subscribe', function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var newsletterForm = server.forms.getForm('newsletter');
    var transaction = require('dw/system/Transaction');
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var formErrors = require('*/cartridge/scripts/formErrors');

    // form validation
    if (!newsletterForm.fullName.value.split(' ')[1]) {
        newsletterForm.valid = false;
        newsletterForm.fullName.valid = false;
        newsletterForm.fullName.error =
            "Por favor preencha o nome completo";
    }

    if (newsletterForm.valid) {
        transaction.wrap(function () {
            var newSubscribe = customObjMgr.createCustomObject('Newsletter', newsletterForm.contactInfoFields.email.value);
            newSubscribe.custom.phone = newsletterForm.contactInfoFields.phone.value;
            newSubscribe.custom.fullName = newsletterForm.fullName.value;
            newSubscribe.custom.isSubscribed = newsletterForm.subscribe.value;
        });

        res.render('/newsletter/newslettersuccess', {
            newsletterForm: newsletterForm
        });
    }

    next();
});

module.exports = server.exports();
