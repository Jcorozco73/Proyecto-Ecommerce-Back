export default {
    user_list: (user) => {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            avatar: user.avatar
           
    }
}

}