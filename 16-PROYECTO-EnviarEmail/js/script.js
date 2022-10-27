// simulador de emails en tailwind 

// ejecutar luego que el html cargue 
// para que no devueva undefined o trate de seleccionar un elemento que no exista
document.addEventListener("DOMContentLoaded", function () {
    
    //objeto vacio se va llenando con la validacion
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    
    // seleccionar los elementos de la interfas
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // esta es la variable que señala al boton de enviar
    const btnReset = document.querySelector('#formulario button[type="reset"]'); 
    const spinner = document.querySelector('#spinner');

    /* asignar eventos
    el blur se ejecuta cuando el usuario avandona un campo
    es un buen lugar para validar para que el usuario no cometa un error
    /* inputEmail.addEventListener("blur", function (e) {
        console.log(e.target.value);
    
        el value no es parte del javascript si no del DOM,
        es el valor que esta ingredado en un input,
        lo usamos para leer el valor que se va a ingresar en el campo email, la forma de acceder a los atributos con javascript va a ser con un objeto
        
    }); 
    inputAsunto.addEventListeners("blur", function () {

    });
    inputMensaje.addEventListeners("blur", function () {

    });

    como el codigo se vuelve repetitivo usamos la siguiente fn
    validar()
    */

    inputEmail.addEventListener('input', validar); /* no se le coloca el parentesis para que la funcion se ejecute luego que ocurra el evento */
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    
    
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();// prevenir el comportamiendo por default que tiene el boton reset

        // reiniciarObjeto()
        email.email = '';

        formulario.reset();
        comprobarEmail();
    });

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        
    }


    function validar(e){
        

        if(e.target.value.trim() === ''){/* en el if estamos verificando si el usuario esta ingresando datos al campo, el .trim() elimina los espacios en blanco del campo */
            mostrarAlerta(`el ${e.target.id} es obligatorio`, e.target.parentElement)
            // nos apoyamos de los id en el html para que el alert sea dinamico

            /*en la 2da parte seleccionamos el elemento y lo llevamos hacia el padre con traversing en la fincion de abajo señalamos referencia, hacemos la referencia al div que contiene el label y el input, y en la funcion de mostrarAlerta lo toma referencia y luego lo llamamos con el  referencia.appendChild(error)*/

            email[e.target.name] = '';
            // comprobar email

            comprobarEmail();
            return;
            // el return en el if hace que la alerta se ejecute si es que el usuario no llena el campo
        }
        

        // cuando no se pase la validacion este codigo se muestra
        // validacion para que el error si pasa, sea en el campo de email
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('el email no es válido', e.target.parentElement);
             // comprobar email
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
    
        // asignar los valores -- si el usuario llega a esta parte es por que las validaciones se hicieron bien 

        // trim elimina los espacios en blanco que pueda tener y el lower case para que sea minusculas
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // comprobar el objeto del email

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        
        limpiarAlerta(referencia);
        
        
        
        // seleccionamos la clase de la alerta
        // hacemos la referencia al espacio del html que vayamos donde este la alerta que vayamos a seleccionar
        
            // se elimina este codigo por que usamos la funcion de limpiar alerta
        
            /* const alerta = referencia.querySelector('.bg-red-600');
            //y definimos un if que remueva la copia de la alerta
            if(alerta) {
                alerta.remove();
            }
            */





        // generar alerta en el html
        // se recomienda que la creacion del elemento el nombre este en mayuscula
        const error = document.createElement('P')// generar un elemento nuevo
        error.textContent = mensaje;
        

        //crear la clase que le da forma al boton de error, con estilos de tailwind
        error.classList.add('bg-red-600', 'text-white', 'p-3', 'text-center','mt-2');
        
        
        /* inyectar el error al formulario
        appendChild agrega un elemento nuevo a lo ya existente,
        eso le dice al formulario agregale un hijo que va a ser el error que se esta construyendo en la parte de arriba */
        // cambiamos formulario por referencia
        
        referencia.appendChild(error)
        
        //señalamos la referencia para que el error se situe debajo de cada campo, 
    

    }

    function limpiarAlerta(referencia){
        // comprueba si ya existe una alerta
        // esta funcion se ejecuta luego que pasamos la validacion del if, en el que el usuario coloca los datos
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }




    function validarEmail(email){
        // expresion regular, es un codigo de este tipo que va a buscar un patron en una cadena de texto o en una serie de numeros, busca qu ese cumpla ese patron, un numero de tarjeta de cretido siempre tienen que ser 16, tambien puede ser un buen uso para una expresion recular, un codigo postal,

        // cual es un patron para un email -- usiario@dominio.com top level domain 
        
        
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        
        // comprobar email
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail(){

        /* este codigo seleciona los valores del objeto email y los vuelve un arreglo, y el inclide es para verificar si aun hay un campo vacio true hasta que no lo haya false*/
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
            // remueve la clase de opacity
            btnSubmit.classList.remove('opacity-50');
            // hace que la clase disable sea false para desactivarla 
            btnSubmit.disabled = false;
        }

});











/*  
    ojo con innerHTML

    no se recomienda usar innerHTML para crear elementos por que no escapa los datos, si se usa innerHTML para imprimir una consulta hecha en una base de datos, pueden atacar ( Cross-Site Request Forgery (CSRF) Attacks: Common Vulnerabilities and Prevention Methods)
 */

// simulador de emails en tailwind 

// ejecutar luego que el html cargue 
// para que no devueva undefined o trate de seleccionar un elemento que no exista
document.addEventListener("DOMContentLoaded", function () {
    
    //objeto vacio se va llenando con la validacion
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    
    // seleccionar los elementos de la interfas
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // esta es la variable que señala al boton de enviar
    const btnReset = document.querySelector('#formulario button[type="reset"]'); 
    const spinner = document.querySelector('#spinner');

    /* asignar eventos
    el blur se ejecuta cuando el usuario avandona un campo
    es un buen lugar para validar para que el usuario no cometa un error
    /* inputEmail.addEventListener("blur", function (e) {
        console.log(e.target.value);
    
        el value no es parte del javascript si no del DOM,
        es el valor que esta ingredado en un input,
        lo usamos para leer el valor que se va a ingresar en el campo email, la forma de acceder a los atributos con javascript va a ser con un objeto
        
    }); 
    inputAsunto.addEventListeners("blur", function () {

    });
    inputMensaje.addEventListeners("blur", function () {

    });

    como el codigo se vuelve repetitivo usamos la siguiente fn
    validar()
    */

    inputEmail.addEventListener('input', validar); /* no se le coloca el parentesis para que la funcion se ejecute luego que ocurra el evento */
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    
    
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();// prevenir el comportamiendo por default que tiene el boton reset

        resetForm();
    });

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        // funcion para hacer que el spinner tenga un tiempo de muestra - simular la carga
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //reiniciarObjeto() - comprobarEmail();
            formulario.reset();
            

            // crear alerta - envio mensaje
            //scRIPTING

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            // tiempo estimado para eliminar la alerta de mensaje enviado
            setTimeout(() =>{
                alertaExito.remove();
            }, 2800)

        }, 2800);
    }


    function validar(e){
        

        if(e.target.value.trim() === ''){/* en el if estamos verificando si el usuario esta ingresando datos al campo, el .trim() elimina los espacios en blanco del campo */
            mostrarAlerta(`el ${e.target.id} es obligatorio`, e.target.parentElement)
            // nos apoyamos de los id en el html para que el alert sea dinamico

            /*en la 2da parte seleccionamos el elemento y lo llevamos hacia el padre con traversing en la fincion de abajo señalamos referencia, hacemos la referencia al div que contiene el label y el input, y en la funcion de mostrarAlerta lo toma referencia y luego lo llamamos con el  referencia.appendChild(error)*/

            // comprobar email
            email[e.target.name] = '';
            // comprobar email

            comprobarEmail();
            return;
            // el return en el if hace que la alerta se ejecute si es que el usuario no llena el campo
        }
        

        // cuando no se pase la validacion este codigo se muestra
        // validacion para que el error si pasa, sea en el campo de email
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('el email no es válido', e.target.parentElement);
            // comprobar email
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
    
        // asignar los valores -- si el usuario llega a esta parte es por que las validaciones se hicieron bien 

        // trim elimina los espacios en blanco que pueda tener y el lower case para que sea minusculas
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // comprobar el objeto del email

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        
        limpiarAlerta(referencia);
        
        
        
        // seleccionamos la clase de la alerta
        // hacemos la referencia al espacio del html que vayamos donde este la alerta que vayamos a seleccionar
        
            // se elimina este codigo por que usamos la funcion de limpiar alerta
        
            /* const alerta = referencia.querySelector('.bg-red-600');
            //y definimos un if que remueva la copia de la alerta
            if(alerta) {
                alerta.remove();
            }
            */





        // generar alerta en el html
        // se recomienda que la creacion del elemento el nombre este en mayuscula
        const error = document.createElement('P')// generar un elemento nuevo
        error.textContent = mensaje;
        

        //crear la clase que le da forma al boton de error, con estilos de tailwind
        error.classList.add('bg-red-600', 'text-white', 'p-3', 'text-center','mt-2');
        
        
        /* inyectar el error al formulario
        appendChild agrega un elemento nuevo a lo ya existente,
        eso le dice al formulario agregale un hijo que va a ser el error que se esta construyendo en la parte de arriba */
        // cambiamos formulario por referencia
        
        referencia.appendChild(error)
        
        //señalamos la referencia para que el error se situe debajo de cada campo, 
    

    }

    function limpiarAlerta(referencia){
        // comprueba si ya existe una alerta
        // esta funcion se ejecuta luego que pasamos la validacion del if, en el que el usuario coloca los datos
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }




    function validarEmail(email){
        // expresion regular, es un codigo de este tipo que va a buscar un patron en una cadena de texto o en una serie de numeros, busca qu ese cumpla ese patron, un numero de tarjeta de cretido siempre tienen que ser 16, tambien puede ser un buen uso para una expresion recular, un codigo postal,

        // cual es un patron para un email -- usiario@dominio.com top level domain 
        
        
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        
        // comprobar email
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail(){
        
        /* este codigo seleciona los valores del objeto email y los vuelve un arreglo, y el inclide es para verificar si aun hay un campo vacio true hasta que no lo haya false*/
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true;
            return;
        }
            // remueve la clase de opacity
            btnSubmit.classList.remove('opacity-50');
            // hace que la clase disable sea false para desactivarla 
            btnSubmit.disable = false;
        }


        function resetForm(){
             // reiniciarObjeto()
            email.email = '';
            email.asunto = '';
            email.mensaje = '';

            formulario.reset();
            comprobarEmail();
        }

});











/*  
    ojo con innerHTML

    no se recomienda usar innerHTML para crear elementos por que no escapa los datos, si se usa innerHTML para imprimir una consulta hecha en una base de datos, pueden atacar ( Cross-Site Request Forgery (CSRF) Attacks: Common Vulnerabilities and Prevention Methods)
 */

