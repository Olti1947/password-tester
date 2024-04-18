const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsContainer = document.getElementById('reasons'); 
let updateStrenghMeter = () =>{
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    console.log(weaknesses)
    let strength = 100;
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness=>{
    if(weakness == null) return
        strength -= weakness.deduction
    const messageElement = document.createElement('div')
    messageElement.innerText = weakness.message
    reasonsContainer.appendChild(messageElement)
    })
    strengthMeter.style.setProperty('--strength',strength)
}


passwordInput.addEventListener('input', updateStrenghMeter)


let calculatePasswordStrength = (password) =>{
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    return weaknesses
}
let lengthWeakness = (password) =>{
    const length = password.length;
    if(length <= 5){
        return {
            message : 'Your password is too short',
            deduction : 40
        }
    }
    if(length <=10){
        return{
            message:'Your password could be longer',
            deduction : 15
        }
    }
}

let characterTypeWeakness = (password,regex,type) =>{
    const matches = password.match(regex) || []
    if(matches.length == 0){
        return {
            message : `Your password has no ${type}`,
            deduction : 20
        }
    }
    if(matches.length <= 2){
        return{
            message : `Your password could use more ${type}`,
            deduction : 5
        }
    }
}
let lowerCaseWeakness = (password) =>{
    return characterTypeWeakness(password,/[a-z]/g, 'lowercase')
    }

let upperCaseWeakness = (password) =>{
        return characterTypeWeakness(password,/[A-Z]/g, 'uppercase')
        }