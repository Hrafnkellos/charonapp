import api from "./api";
const PORT = 5000;

api.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
