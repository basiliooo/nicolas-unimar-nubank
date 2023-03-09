let inputCPF = document.querySelector('input')

inputCPF.addEventListener('keypress', () => {
    let inputlength = inputCPF.value.length

    if(inputlength === 3 || inputlength === 7){
        inputCPF.value += '.'
    } else if(inputlength === 11) {
        inputCPF.value += '-'
    }
})

let validator = {
    handleSubmit: (e) => {
        e.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');
        let btn = form.querySelector('.btn')

        validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if (check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if (send) { 
            btn.disabled = true;
            btn.innerText = 'Aguarde...'
            setTimeout(()=>{
                form.submit()
            }, 2000)
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|')
            for (let rule in rules) {
                let rDetails = rules[rule].split(':');

                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo é obrigatório';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo deve ter no mínimo ' + rDetails[1] + ' caracteres';
                        }
                        break;
                    case 'email':
                        if (input.value.length != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido';
                            }
                        }
                        break;
                    case 'cpf':
                        if(input.value != '123.456.789-00'){
                            return 'Algo deu errado';
                        }
                        break;
                    case 'senha':
                        if(input.value != '123456'){
                            return 'Algo deu errado';
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#dd686a';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentNode.insertBefore(errorElement, input.nextSibling);

    },
    clearErrors: () => {
        let input = form.querySelectorAll('input');
        input.forEach(item => {
            item.style = '';
        })

        let errorElement = document.querySelectorAll('.error')
        errorElement.forEach(error => {
            error.remove();
        })
    }
}

let form = document.querySelector('.validatorForm');
form.addEventListener('submit', validator.handleSubmit);
