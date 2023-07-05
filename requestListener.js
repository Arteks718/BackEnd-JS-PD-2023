import url from "url";
const requestListener = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello Client\n');
    const data = url.parse(req.url, true).query;
    console.dir(data);
    res.write(`url: ${req.url}`);
    res.end();
};
export { requestListener };
