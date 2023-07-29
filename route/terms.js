const express = require('express'); 
const terms = require('../controller/terms_controllers');


const router = express();



router.post('/terms', [  terms.addterms]);
router.get('/terms', [  terms.getterms]);
router.put('/terms/:id',[ terms.updateterms]);
router.delete('/terms/:id',[  terms.DeleteTerms]);


//labour 
router.post('/lanour_terms', terms.addterms_labour);
router.get('/lanour_terms', terms.getterms_labour);
router.put('/lanour_terms/:id', terms.updateterms_labour);
router.delete('/lanour_terms/:id', terms.DeleteTerms_labour)

module.exports = router;