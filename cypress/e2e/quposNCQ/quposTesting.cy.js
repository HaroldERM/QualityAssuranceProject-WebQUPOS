/*
Link Github Repo:
https://github.com/HaroldERM/QualityAssuranceProject-WebQUPOS
*/

/// <reference types="cypress" />
/*
Casos de prueba para el apartado del Login
Objetivos: Probar las principales funcionalidades del Login
*/
describe('Login', function () {

    beforeEach(function () {
        cy.visit('http://demo.qupos.com/');
        cy.get('button.btn.btn-default.dropdown-toggle.btnUser').first().click();
        cy.wait(1000)
        cy.get('#btnIngresar.dropdown-item.dropdown-hover').click();
        cy.wait(1000)
    });

    /*
    Nombre: Correo invalido
    Objetivo: Validar que se muestre un mensaje de error si el correo que se ingresa es invalido
    Datos de prueba: Correo: 86097312 (invalido)
    Resultado esperado: El correo es invalido, entonces se debe mostrar un mensaje de error
    */
    it('Correo invalido', () => {
        cy.get('#correoLogin.form-control').type('86097312');
        cy.get('#passLogin.form-control').type(' ').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar un correo electrónico valido').should('have.css', 'display', 'block');
        });
    })

    /*
    Nombre: Correo valido
    Objetivo: Validar que no se muestre un mensaje de error si el correo que se ingresa es valido
    Datos de prueba: Correo: 86097312.dv@gmail.com (valido)
    Resultado esperado: El correo es valido, entonces no se debe mostrar un mensaje de error
    */
    it('Correo valido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type(' ').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar un correo electrónico valido').should('have.css', 'display', 'none');
        });
    })

    /*
    Nombre: Contraseña vacia
    Objetivo: Validar que se muestre un mensaje de error si el campo de la contraseña queda vacia
    Datos de prueba: Contraseña: null
    Resultado esperado: El campo de la contraseña esta vacio, entonces se debe mostrar un mensaje de error
    */
    it('Contraseña vacia', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com{enter}').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar una contraseña.').should('have.css', 'display', 'block');
        });
    })

    /*
    Nombre: Login invalido
    Objetivo: Validar que se muestre un mensaje de error si el correo o la contraseña ingresados son incorrectos para el inicio de sesion
    Datos de prueba: Correo: 86097312.dv@gmail.com (valido), Contraseña: h0a93u4 (incorrecta)
    Resultado esperado: Los datos suministrados son invalidos para iniciar sesion, entonces se debe mostrar un mensaje de error
    */
    it('Login invalido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type('h0a93u4{enter}').then(function () {
            cy.wait(2000)
            cy.get('form').get('div.text-center').get('h5').contains('Correo electrónico o contraseña incorrectos').should('exist');
        });
    })

    /*
    Nombre: Login valido
    Objetivo: Validar que no se muestre un mensaje de error si el correo o la contraseña ingresados son correctos para el inicio de sesion y ademas debe de iniciarse la sesion
    Datos de prueba: Correo: 86097312.dv@gmail.com (valido), Contraseña: h0a93u4q (correcta)
    Resultado esperado: Los datos suministrados son validos para iniciar sesion, entonces no se debe mostrar un mensaje de error y se debe de iniciar la sesion correctamente
    */
    it('Login valido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type('h0a93u4q{enter}').then(function () {
            cy.wait(1000)
            cy.get('form').get('div.text-center').get('h5').contains('Correo electrónico o contraseña incorrectos').should('not.exist');
        });
        cy.wait(1000)
        cy.get('span').contains('×').click()
    })
});

/*
Casos de prueba para el apartado del Buscador de productos
Objetivos de estos casos: Validar que el buscador funcione de manera correcta con sus diferentes filtros (descripcion, marca, familia) de busqueda
*/
describe('Buscador de productos', function () {

    beforeEach(function () {
        cy.wait(1000)
    });

    /*
    Nombre: Buscar por descripcion (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su descripcion
    Datos de prueba: Filtro: descripcion, Buscar: COCA
    Resultado esperado: Que se encuentren productos que contengan COCA en su descripcion 
    */
    it('Buscar por descripcion (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('COCA');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por descripcion (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su descripcion
    Datos de prueba: Filtro: descripcion, Buscar: sfdgtvfs
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'sfdgtvfs' en su descripcion
    */
    it('Buscar por descripcion (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('sfdgtvfs');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por marca (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su marca
    Datos de prueba: Filtro: marca, Buscar: COCA
    Resultado esperado: Que se encuentren productos que contengan COCA en su marca 
    */
    it('Buscar por marca (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('Descripción').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('COCA');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por marca (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su marca
    Datos de prueba: Filtro: marca, Buscar: asdfascs
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'asdfascs' en su marca
    */
    it('Buscar por marca (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('asdfascs');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por familia (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su familia
    Datos de prueba: Filtro: familia, Buscar: Jugos y refrescos
    Resultado esperado: Que se encuentren productos que contengan Jugos y refrescos en su familia 
    */
    it('Buscar por familia (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('Jugos y refrescos');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por familia (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su familia
    Datos de prueba: Filtro: familia, Buscar: fasdfggc
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'fasdfggc' en su familia
    */
    it('Buscar por familia (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('fasdfggc');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por familia y por descripcion (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su familia o descripcion
    Datos de prueba: Filtro: familia y descripcion, Buscar: Jugos y refrescos
    Resultado esperado: Que se encuentren productos que contengan Jugos y refrescos en su familia o descripcion
    */
    it('Buscar por familia y descripcion (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('Descripción').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('Jugos y refrescos');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por familia y descripcion (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su familia o descripcion
    Datos de prueba: Filtro: familia y descripcion, Buscar: fasdfggc
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'fasdfggc' en su familia o descripcion
    */
    it('Buscar por familia y descripcion (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('fasdfggc');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por familia y por marca (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su familia o marca
    Datos de prueba: Filtro: familia y marca, Buscar: coca
    Resultado esperado: Que se encuentren productos que contengan coca en su familia o marca
    */
    it('Buscar por familia y marca (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('Descripción').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('coca');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por familia y marca (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su familia o marca
    Datos de prueba: Filtro: familia y marca, Buscar: fasdfggc
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'fasdfggc' en su familia o marca
    */
    it('Buscar por familia y marca (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('fasdfggc');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por descripcion y por marca (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su descripcion o marca
    Datos de prueba: Filtro: descripcion y marca, Buscar: coca
    Resultado esperado: Que se encuentren productos que contengan coca en su descripcion o marca
    */
    it('Buscar por descripcion y marca (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('Descripción').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('coca');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por descripcion y marca (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su descripcion o marca
    Datos de prueba: Filtro: descripcion y marca, Buscar: fasdfggc
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'fasdfggc' en su familia o marca
    */
    it('Buscar por descripcion y marca (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('fasdfggc');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    /*
    Nombre: Buscar por descripcion, por marca y por familia (valido)
    Objetivo: Validar que se encuentre un producto existente si se busca con una palabra que coincida con su descripcion, marca o familia
    Datos de prueba: Filtro: descripcion, marca y familia, Buscar: coca
    Resultado esperado: Que se encuentren productos que contengan coca en su descripcion, marca o familia
    */
    it('Buscar por descripcion, marca, familia (valido)', () => {
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('coca');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })

    /*
    Nombre: Buscar por descripcion, por marca y por familia (invalido)
    Objetivo: Validar que no se encuentre un producto existente si no se busca con una palabra que coincida con su descripcion, marca o familia
    Datos de prueba: Filtro: descripcion, marca y familia, Buscar: fasdfggc
    Resultado esperado: Que no se encuentren productos, ya que ninguno contiene 'fasdfggc' en su descripcion, marca o familia
    */
    it('Buscar por descripcion, familia y marca (invalido)', () => {
        cy.get('div.input-group').get('input.form-control').first().type('fasdfggc');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })

    afterEach(function () {
        cy.get('div.input-group').get('input.form-control').first().clear();
    });
});

/*
Casos de prueba para el apartado de filtros de los productos
Obejetivos: Probar que los CheckBoxes (filtros) funcionen correctamente
*/
describe('Filtros (CheckBoxes)', function () {

    beforeEach(function () {
        cy.wait(1000)
        cy.get('table.row-table.all-elements').get('div.col-auto.mr-auto.my-auto').click()
    });

    /*
    Nombre: Filtro (CheckBox) por Solo ofertas (valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por Solo ofertas (valido)', () => {
        cy.contains('Solo ofertas ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia ARROZ (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia ARROZ (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('ARROZ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: ARROZ').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia BATERIAS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia BATERIAS (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('BATERIAS').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: BATERIAS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia: BEBIDAS GASEOSAS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia: BEBIDAS GASEOSAS (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('BEBIDAS GASEOSAS').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: BEBIDAS GASEOSAS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia SNACKS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia SNACKS (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('SNACKS').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: SNACKS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia FERRETERIA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia FERRETERIA (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('FERRETERIA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: FERRETERIA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia CAFE Y TE (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia CAFE Y TE (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('CAFE Y TE').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: CAFE Y TE').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia CEREALES (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia CEREALES (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('CEREALES ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: CEREALES').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia DESODORANTES (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia DESODORANTES (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('DESODORANTES ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: DESODORANTES').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia EMBUTIDOS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia EMBUTIDOS (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('EMBUTIDOS ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: EMBUTIDOS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia HARINA Y MASA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia HARINA Y MASA (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('HARINA Y MASA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: HARINA Y MASA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia JUGOS Y REFRESCOS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia JUGOS Y REFRESCOS (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('JUGOS Y REFRESCOS ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: JUGOS Y REFRESCOS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por familia LICORES (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por familia LICORES (Valido)', () => {
        cy.get('div#div-list-familia').get('label.container').contains('LICORES ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Familia: LICORES').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca 3M (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca 3M (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('3M ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: 3M').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca 7 UP (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca 7 UP (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('7 UP ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: 7 UP').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca 19 CRIMES (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca 19 CRIMES (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('19 CRIMES ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: 19 CRIMES').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca 1820 (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca 1820 (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('1820 ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: 1820').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca CASTELLANO (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca CASTELLANO (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('CASTELLANO ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: CASTELLANO').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca COCA COLA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca COCA COLA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('COCA COLA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: COCA COLA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca DURACEL (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca DURACEL (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('DURACEL ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: DURACEL').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca FANTA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca FANTA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('FANTA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: FANTA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca FLORES (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca FLORES (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('FLORES ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: FLORES').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca HARIFINA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca HARIFINA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('HARIFINA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: HARIFINA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca INDAVIGO (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca INDAVIGO (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('INDAVIGO ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: INDAVIGO').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca JACKS (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca JACKS (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('JACKS ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: JACKS').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca JINCA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca JINCA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('JINCA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: JINCA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca KIMBY (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca KIMBY (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('KIMBY ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: KIMBY').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca MASAREPA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca MASAREPA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('MASAREPA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: MASAREPA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca MISABOR (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca MISABOR (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('MISABOR ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: MISABOR').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca NO DEFINIDA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca NO DEFINIDA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('NO DEFINIDA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: NO DEFINIDA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca PRODUCTOS DE MAMA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca PRODUCTOS DE MAMA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('PRODUCTOS DE MAMA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: PRODUCTOS DE MAMA').should('exist')
        });
    });

    /*
    Nombre: Filtro (CheckBox) por marca REXONA (Valido)
    Objetivo: La seleccion del CheckBox funciona correctamente
    Datos de prueba: N/A
    Resultado esperado: Mostrar pruductos relacionados con el nombre CheckBox (filtro)
    */
    it('Filtro (CheckBox) por marca REXONA (Valido)', () => {
        cy.get('div#div-list-marca').get('label.container').contains('REXONA ').click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').contains('Marca: REXONA').should('exist')
        });
    });
});

/*
Casos de prueba para el apartado de Carrito de compras
Objetivos: Probar las principales funcionalidades del Carrito de compras
*/
describe('Carrito de compras', function () {

    beforeEach(function () {
        cy.wait(1000)
    });

    /*
    Nombre: Añadir pruducto al carrito (Valido) 
    Objetivo: Probar que la funcionalidad de añadir un producto al carrito de compras funcione de buena manera
    Datos de prueba: Seleccionar un producto para agregarlo al carrito de compras
    Resultado esperado: Que el producto que se selecciono se encuentre en el carrito de compras
    */
    it('Añadir pruducto al carrito (Valido)', () => {
        cy.get('div.card.m-2.producto').get('a.boton_personalizado').contains('Agregar').click()
        cy.wait(1000)
        cy.get('div.row.mx-auto').get('button.btn.boton_aceptar.mr-4.btn-secondary').contains('Aceptar').click()
        cy.wait(1000)
        cy.get('table.row-table.all-elements').get('div.ml-1.text-right').get('div.item.p-0').get('span.notify-badge').first().click()
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('td.text-center.align-self-center.align-middle').should('exist')
    });

    /*
    Nombre: Modificar pruducto del carrito (Valido)
    Objetivo: Probar que la funcionalidad de modificar un producto del carrito de compras funcione de buena manera
    Datos de prueba: Seleccionar un producto para modificar del carrito de compras
    Resultado esperado: Que el producto que se selecciono para modificar se encuentre modificado exitosamente en el carrito de compras
    */
    it('Modificar pruducto del carrito (Valido)', () => {
        cy.wait(1000)
        cy.get('td.text-center.align-middle').get('svg.bi-pencil-square.h4.mr-1.b-icon.bi.text-dark').first().click()
        cy.wait(1000)
        cy.get('input#cantidad_input.atributo_editable.form-control').type('6{enter}');
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('td.text-center.align-self-center.align-middle').contains('6').should('exist')
    });

    /*
    Nombre: Eliminar pruducto del carrito (Valido)
    Objetivo: Probar que la funcionalidad de eliminar un producto del carrito de compras funcione de buena manera
    Datos de prueba: Seleccionar un producto para eliminar del carrito de compras
    Resultado esperado: Que el producto que se selecciono para eliminar sea eliminado exitosamente del carrito de compras
    */
    it('Eliminar pruducto del carrito (Valido)', () => {
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('svg.bi-trash.h4.b-icon.bi.text-dark').first().click()
        cy.wait(1000)
        cy.get('div.row.mx-auto').get('button.btn.boton_aceptar.mr-4.btn-secondary').contains('Eliminar').click()
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('td.text-center.align-self-center.align-middle').should('not.exist')
        cy.get('table.row-table.all-elements').get('div.col-auto.mr-auto.my-auto').click()
    });
});

/*
Casos de prueba para el apartado de Favoritos
Objetivos: Probar las principales funcionalidades de Favoritos
*/
describe('Favoritos', function () {

    beforeEach(function () {
        cy.wait(1000)
    });

    /*
    Nombre: Añadir pruducto a favoritos (Valido) 
    Objetivo: Probar que la funcionalidad de añadir un producto a favoritos funcione de buena manera
    Datos de prueba: Seleccionar un producto para agregarlo a favoritos
    Resultado esperado: Que el producto que se selecciono se encuentre en favoritos
    */
    it('Añadir pruducto a favoritos (Valido)', () => {
        cy.get('div.favorito-icono-sin-oferta').get('svg.bi-heart.h4.b-icon.bi').first().click()
        cy.wait(1000)
        cy.get('div.row.mx-auto').get('button.btn.boton_aceptar.mr-4.btn-secondary').contains('Aceptar').click()
        cy.wait(1000)
        cy.get('div.row.mx-auto').get('button.btn.boton_aceptar.mr-4.btn-secondary').contains('Aceptar').click()
        cy.wait(1000)
        cy.get('table.row-table.all-elements').get('div.ml-1.text-right').get('svg.bi-heart-fill.logo-favorito.b-icon.bi').first().click()
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('td.text-center.align-self-center.align-middle').should('exist')
    });

    /*
    Nombre: Eliminar pruducto de favoritos (Valido)
    Objetivo: Probar que la funcionalidad de eliminar un producto de favoritos funcione de buena manera
    Datos de prueba: Seleccionar un producto para eliminar de favoritos
    Resultado esperado: Que el producto que se selecciono para eliminar sea eliminado exitosamente de los favoritos
    */
    it('Eliminar pruducto de favoritos (Valido)', () => {
        cy.get('div.b-table-sticky-header.table-responsive').get('svg.bi-trash.h4.b-icon.bi.text-danger').first().click()
        cy.wait(1000)
        cy.get('div.row.mx-auto').get('button.btn.boton_aceptar.mr-4.btn-secondary').contains('Eliminar').click()
        cy.wait(1000)
        cy.get('div.b-table-sticky-header.table-responsive').get('td.text-center.align-self-center.align-middle').should('not.exist')
        cy.get('table.row-table.all-elements').get('div.col-auto.mr-auto.my-auto').click()
    });
});