/**
 * Created by Administrator on 2017/7/12.
 */
require('./init');

var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack';
var agentOptions = {
    pfx: fs.readFileSync('./cert.p12'),
    passphrase: ''
};
var bizData = {
    nonce_str: utils.createRandomStr(32),
    mch_billno: 'T' + utils.dateFormat(new Date(), 'yyyyMMddhhmmssS') + 'U' + 1000171,
    mch_id: '',
    wxappid: '',
    send_name: '七星江苏麻将',
    re_openid: 'ol7yH0qim9f6Wu_1sEWNQk9GxqfQ',
    total_amount: '100',
    total_num: '1',
    wishing: '加入七星，月入过万',
    client_ip: '39.108.11.211',
    act_name: '加入七星，月入过万',
    remark: '加入七星，月入过万'
};
bizData.sign = cryptoJs.MD5(utils.link(utils.sort(utils.filter(bizData))) + '&key=AAKCAQEAoEJ65ei3fIZSMjOkslB2ThWk').toString().toUpperCase();
var builder = new xml2js.Builder();
var parser = new xml2js.Parser({trim: true, explicitArray: false, explicitRoot: false});
var xmlData = builder.buildObject(bizData);
request.post(url, {form: xmlData, agentOptions: agentOptions}, function(err, rsp, body) {
    if (err) {
        logger.error(err);
        return;
    }
    parser.parseString(body, function(err, json) {
        if (err) {
            logger.error(err);
        }
        logger.info(json);
    });
});