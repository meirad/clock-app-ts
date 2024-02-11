"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const timezone_enum_1 = __importDefault(require("timezone-enum"));
const app = (0, express_1.default)();
const PORT = 3003;
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.get('/api/mytz', (req, res) => {
    const myTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    res.send(myTimezone);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.get('/api/timezones', (req, res) => {
    const allTimeZones = Object.values(timezone_enum_1.default);
    res.send(allTimeZones);
});
//# sourceMappingURL=server.js.map