const Router = require('express').Router;
const router = new Router();
const Parser = require('@postlight/parser');
const ParserCustomizer = require('./customizer');

ParserCustomizer.customize(Parser);

router.route('/').get((req, res) => {
    res.json({
        message: 'Savvynci is ready to serve 🚀',
    });
});

router.route('/parser').get(async (req, res) => {
    let result = { message: 'No URL was provided' };
    if (req.query.url) {
        try {
            const contentType = req.query.contentType || 'text';
            let headers = new Object();
            if (typeof req.query.headers !== 'undefined') {
                headers = JSON.parse(req.query.headers);
            }
            result = await Parser.parse(req.query.url, {
                contentType,
                headers,
            });
        } catch (error) {
            result = { error: true, messages: error.message };
        }
    }
    return res.json(result);
});

module.exports = router;
