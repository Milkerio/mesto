class UserInfo{
    constructor({nameSelector, aboutSelector, avatarSelector}){
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutSelector = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo(){
        return{
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent
        }
    }
    setUserInfo({name, about}){
        this._nameSelector.textContent = name;
        this._aboutSelector.textContent = about;
    }
    setUserAvatar(link){
        this._avatar.src = link.avatar;
    }
}
export {UserInfo};