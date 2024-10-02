// Função para mostrar o formulário correspondente
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Pega o alvo do formulário a partir do atributo 'data-target'
        const targetFormId = this.getAttribute('data-target');
        const targetForm = document.getElementById(targetFormId);
        
        // Fecha todos os formulários abertos
        document.querySelectorAll('.form-container').forEach(form => {
            form.classList.remove('active');
        });
        
        // Exibe o formulário correspondente
        targetForm.classList.add('active');
    });
});

// Função para mostrar o formulário correto e ocultar os outros
function showForm(targetId) {
    // Oculta todos os formulários
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.classList.add('hidden');  // Esconde todos os formulários
    });

    // Mostra o formulário selecionado
    const targetForm = document.getElementById(targetId);
    if (targetForm) {
        targetForm.classList.remove('hidden');  // Exibe o formulário desejado
    }
}

// Adiciona eventos de clique aos links do menu
document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();  // Previne o comportamento padrão do link
        const targetId = link.getAttribute('data-target');
        showForm(targetId);  // Chama a função para mostrar o formulário correspondente
    });
});

// Função para fechar o formulário
function closeForm() {
    // Oculta todos os formulários
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.classList.add('hidden');  // Esconde todos os formulários
    });
}




document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Esconde todos os formulários
        document.querySelectorAll('.form-container').forEach(form => {
            form.classList.add('hidden');
        });

        // Exibe o formulário correspondente
        const targetForm = document.getElementById(this.getAttribute('data-target'));
        if (targetForm) {
            targetForm.classList.remove('hidden');
        }
    });
});

//CLIENTE.JS
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const celularInput = document.getElementById('celular');
    const rendaInput = document.getElementById('renda');
    const form = document.getElementById('clientes-form');

    // Função para aplicar a máscara de CPF
    cpfInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 caracteres
        }
        this.value = value
            .replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4'); // Aplica a máscara
    });

    // Máscara para Telefone e Celular
    function applyPhoneMask(input) {
        input.addEventListener('input', function() {
            let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (value.length > 11) {
                value = value.slice(0, 11); // Limita a 11 caracteres
            }
            if (value.length <= 10) {
                input.value = value
                    .replace(/^(\d{2})(\d{0,4})/, '($1) $2')
                    .replace(/(\d{4})(\d{0,4})/, '$1-$2');
            } else {
                input.value = value
                    .replace(/^(\d{2})(\d{0,5})/, '($1) $2')
                    .replace(/(\d{5})(\d{0,4})/, '$1-$2');
            }
        });
    }

    applyPhoneMask(telefoneInput);
    applyPhoneMask(celularInput);

    // Função para formatar a renda como moeda
    rendaInput.addEventListener('input', function() {
        // Remove caracteres não numéricos e converte para número
        let value = this.value.replace(/[^\d]/g, '');
        if (value === '') value = '0';
        let numericValue = parseFloat(value) / 100;
        this.value = numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });
});
//VEICULOS.JS
document.addEventListener('DOMContentLoaded', function() {
    const chassiInput = document.getElementById('chassi');
    const placaInput = document.getElementById('placa');
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    const anoFabricacaoInput = document.getElementById('ano-fabricacao');
    const anoModeloInput = document.getElementById('ano-modelo');
    const corInput = document.getElementById('cor');
    const valorInput = document.getElementById('valor');
    const form = document.querySelector('.veiculos-form');

    let chassiAlertShown = false; // Flag para controlar a exibição do alerta

    // Máscara para o campo de Chassi
    chassiInput.addEventListener('input', function() {
        let value = this.value.replace(/[^A-Za-z0-9]/g, ''); // Remove caracteres não alfanuméricos
        if (value.length > 17) {
            value = value.slice(0, 17); // Limita a 17 caracteres
        }
        this.value = value;
    });

    chassiInput.addEventListener('focus', function() {
        if (!chassiAlertShown) {
            chassiAlertShown = true;
            alert('O chassi deve conter letras e números.');
        }
    });

    // Máscara para o campo de Placa
    placaInput.addEventListener('input', function() {
        let value = this.value.replace(/[^A-Za-z0-9]/g, ''); // Remove caracteres não alfanuméricos
        if (value.length > 7) {
            value = value.slice(0, 7); // Limita a 7 caracteres
        }
        this.value = value
            .replace(/^([A-Za-z]{3})([0-9]{1,3})/, '$1-$2')
            .replace(/^([A-Za-z]{3}-[0-9]{1,3})([A-Za-z]{0,1})([0-9]{0,1})/, '$1$2$3');
    });

    // Adicionar marcas e modelos
    const marcas = ['Fiat', 'Volkswagen', 'Ford', 'Chevrolet', 'Honda'];
    const modelos = {
        'Fiat': ['Uno', 'Palio', 'Toro'],
        'Volkswagen': ['Gol', 'Passat', 'Tiguan'],
        'Ford': ['Fiesta', 'Focus', 'EcoSport'],
        'Chevrolet': ['Onix', 'Tracker', 'Camaro'],
        'Honda': ['Civic', 'HR-V', 'Fit']
    };

    // Preencher a lista de marcas
    marcas.forEach(marca => {
        let option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaInput.appendChild(option);
    });

    // Atualizar modelos com base na marca selecionada
    marcaInput.addEventListener('change', function() {
        const selectedMarca = this.value;
        modeloInput.innerHTML = '<option value="">Selecione um modelo</option>'; // Limpa modelos existentes
        if (modelos[selectedMarca]) {
            modelos[selectedMarca].forEach(modelo => {
                let option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                modeloInput.appendChild(option);
            });
        }
    });

    // Adicionar opções de ano para os campos Ano de Fabricação e Ano do Modelo
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anoFabricacaoInput.appendChild(option);
        anoModeloInput.appendChild(option.cloneNode(true)); // Clona o mesmo ano para ambos os campos
    }

    // Função para formatar a entrada como moeda
    valorInput.addEventListener('input', function() {
        // Remove caracteres não numéricos e mantém somente os dígitos
        let value = this.value.replace(/[^\d]/g, '');
        if (value === '') value = '0';
        // Converte para número e formata como moeda
        let numericValue = parseFloat(value) / 100;
        this.dataset.rawValue = numericValue; // Armazena o valor bruto para envio
        this.value = numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

});
//COMPRAS.JS
document.addEventListener('DOMContentLoaded', function() {
    const formCompras = document.querySelector('.compras-form');
    const numeroCompraInput = document.getElementById('numero-compra');
    const dataInput = document.getElementById('data');
    const clienteSelect = document.getElementById('cliente');
    const veiculoSelect = document.getElementById('veiculo');
    const valorInput = document.getElementById('valor');
    const valorDisplay = document.getElementById('valor-display'); // Um campo para mostrar o valor

    // Função para gerar número único de compra
    function gerarNumeroCompra() {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString();
        return `C-${timestamp}-${random}`;
    }

    numeroCompraInput.value = gerarNumeroCompra();
});
//VENDEDORES.JS
document.addEventListener('DOMContentLoaded', function() {
    const nomeVendedorInput = document.getElementById('nome-vendedor');
    const form = document.querySelector('.vendedores-form');


});
//PEDIDOS.JS
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.pedidos-form');
    const numeroPedidoInput = document.getElementById('numero-pedido');
    const dataInput = document.getElementById('data');
    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const quantidadeInput = document.getElementById('quantidade');

    // Função para gerar um número automático de pedido
    function gerarNumeroPedido() {
        return Math.floor(Math.random() * 1000000);
    }

    // Inicializar o número do pedido
    numeroPedidoInput.value = gerarNumeroPedido();

    // Função para salvar dados no Firebase
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Obtenha os valores dos campos
        const numeroPedido = numeroPedidoInput.value;
        const data = dataInput.value;
        const marca = marcaSelect.value;
        const modelo = modeloSelect.value;
        const quantidade = parseInt(quantidadeInput.value, 10);

        // Adicione logs para depuração
        console.log('Número do Pedido:', numeroPedido);
        console.log('Data:', data);
        console.log('Marca:', marca);
        console.log('Modelo:', modelo);
        console.log('Quantidade:', quantidade);

    });
});
//MONTADORAS.JS
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do formulário
    const cnpjInput = document.getElementById('cnpj');
    const telefoneInput = document.getElementById('telefone-montadora');
    const celularInput = document.getElementById('celular-montadora');
    const marcaSelectMontadora = document.getElementById('marca-montadora');
    const form = document.querySelector('.montadoras-form');

    // Função para formatar o CNPJ
    function formatCNPJ(value) {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 18); // Limita a 18 caracteres
    }

    // Função para aplicar a máscara de telefone
    function applyPhoneMask(input) {
        input.addEventListener('input', function() {
            let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (value.length > 11) {
                value = value.slice(0, 11); // Limita a 11 caracteres
            }
            if (value.length <= 10) {
                input.value = value
                    .replace(/^(\d{2})(\d{0,4})/, '($1) $2')
                    .replace(/(\d{4})(\d{0,4})/, '$1-$2');
            } else {
                input.value = value
                    .replace(/^(\d{2})(\d{0,5})/, '($1) $2')
                    .replace(/(\d{5})(\d{0,4})/, '$1-$2');
            }
        });
    }

    // Adiciona a máscara aos campos de telefone e celular
    applyPhoneMask(telefoneInput);
    applyPhoneMask(celularInput);

    // Formata o CNPJ ao digitar
    cnpjInput.addEventListener('input', function() {
        this.value = formatCNPJ(this.value);
    });

    // Adicionar marcas de montadoras de carros
    const marcas = ['Fiat', 'Volkswagen', 'Ford', 'Chevrolet', 'Honda', 'Toyota', 'Nissan', 'Hyundai', 'Kia', 'Mazda'];
    marcas.forEach(marca => {
        let option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcaSelectMontadora.appendChild(option);
    });
});

//vendas.js
document.addEventListener("DOMContentLoaded", function() {
    const inputNumeroVenda = document.querySelector("input[name='numero_venda']");
    const inputValorVeiculo = document.querySelector("input[name='valor_veiculo']");
    const inputValorEntrada = document.querySelector("input[name='valor_entrada']");
    const inputValorFinanciado = document.querySelector("input[name='valor_financiado']");
    const inputQuantidadeParcelas = document.querySelector("input[name='parcelas']");
    const inputValorParcelas = document.querySelector("input[name='valor_parcelas']");
    const inputValorTotal = document.querySelector("input[name='valor_total']");

    // Função para gerar um número de venda automaticamente
    function gerarNumeroVenda() {
        let ultimoNumeroVenda = parseInt(localStorage.getItem('ultimoNumeroVenda')) || 0;
        let novoNumeroVenda = ultimoNumeroVenda + 1;
        localStorage.setItem('ultimoNumeroVenda', novoNumeroVenda);
        inputNumeroVenda.value = novoNumeroVenda;
    }

    // Função para formatar o valor como moeda
    function formatCurrency(input) {
        let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
        value = (value / 100).toFixed(2) + ''; // Divide by 100 for reais
        value = value.replace('.', ','); // Replace dot with comma
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Format as currency
        input.value = value;

        calculateFinancedAmount();
    }

    // Função para calcular o valor financiado
    function calculateFinancedAmount() {
        const valorVeiculo = parseFloat(inputValorVeiculo.value.replace(/\D/g, '')) || 0;
        const valorEntrada = parseFloat(inputValorEntrada.value.replace(/\D/g, '')) || 0;

        const valorFinanciado = valorVeiculo - valorEntrada;
        inputValorFinanciado.value = formatCurrencyValue(valorFinanciado);

        calculateParcelas();
    }

    // Função para calcular o valor das parcelas
    function calculateParcelas() {
        const valorFinanciado = parseFloat(inputValorFinanciado.value.replace(/\D/g, '')) || 0;
        const numParcelas = parseInt(inputQuantidadeParcelas.value) || 1;

        const valorParcelas = numParcelas > 0 ? valorFinanciado / numParcelas : 0;
        inputValorParcelas.value = formatCurrencyValue(valorParcelas);

        // Calcular o valor total
        const valorTotal = valorParcelas * numParcelas;
        inputValorTotal.value = formatCurrencyValue(valorTotal);
    }

    // Função para formatar valores como moeda
    function formatCurrencyValue(value) {
        if (value === 0) return '0,00';
        value = (value / 100).toFixed(2) + ''; // Divide por 100 para reais
        value = value.replace('.', ','); // Replace dot with comma
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Format as currency
        return value;
    }

    // Gerar número de venda ao carregar a página
    gerarNumeroVenda();

    // Adicionar eventos de input para formatação e cálculos automáticos
    inputValorVeiculo.addEventListener('input', function() {
        formatCurrency(inputValorVeiculo);
    });

    inputValorEntrada.addEventListener('input', function() {
        formatCurrency(inputValorEntrada);
    });

    inputQuantidadeParcelas.addEventListener('input', function() {
        calculateParcelas();
    });
});