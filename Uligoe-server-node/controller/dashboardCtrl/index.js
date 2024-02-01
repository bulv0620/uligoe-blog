const process = require('../../config/process')
const uuid = require('../../utils/uuid')

exports.getStatistics = async (ctx) => {
    const articleCountQuery = process.query(ctx, 'select count(*) as article_count from article', { origin: true, isObj: true });
    const commentCountQuery = process.query(ctx, 'select count(*) as comment_count from comment', { origin: true, isObj: true });
    const visitCountQuery = process.query(ctx, 'select sum(count_num) as visit_count from visit_count', { origin: true, isObj: true });
    const visitCountListQuery = process.query(
        ctx,
        `SELECT a.date,IFNULL(b.visit_count,0) AS count
        FROM (
            SELECT CURDATE() AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY) AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY) AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY) AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY) AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY) AS DATE
            UNION ALL
            SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY) AS DATE
        ) a LEFT JOIN (
            SELECT DATE, SUM(count_num) AS visit_count FROM visit_count GROUP BY DATE ORDER BY DATE DESC LIMIT 0, 7
        ) b ON a.date = b.date;`,
        { origin: true }
    );

    const res = await Promise.all([articleCountQuery, commentCountQuery, visitCountQuery, visitCountListQuery]);

    res[3] = { visit_count_list: res[3] };

    const data = res.reduce((prev, cur) => {
        return Object.assign(prev, cur)
    });

    ctx.body = {
        code: 1,
        data,
        message: '获取仪表盘数据成功'
    }
}