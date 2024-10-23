export const getUsers = (req, res) => {
    const users = ['User1', 'User2', 'User3']; 
    res.json(users); 
};