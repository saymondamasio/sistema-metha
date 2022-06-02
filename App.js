import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Pages
import OS from './Pages/OS/OS';
import ProcurarObsOS from './Pages/OS/PesquisarOS/ProcurarObs/ProcurarObs';
import OSLista from './Pages/OS/PesquisarOS/OSEncontradaLista/OSEncontradaLista';
import OSEncontrada from './Pages/OS/PesquisarOS/OSEncontrada/OSEncontrada';
import OSHandleOBS from './Pages/OS/PesquisarOS/OSEncontrada/HandleOBS/Form';
import OSHandleDefeito from './Pages/OS/PesquisarOS/OSEncontrada/HandleDefeito/Form';
import PassagemParam from './Pages/OS/PesquisarOS/OSEncontrada/PassagemParam';

import ProcurarOS from './Pages/OS/PesquisarOS/PesquisarOS';
import ProcurarOSCPF from './Pages/OS/PesquisarOS/ProcurarCPF/ProcurarCPF';
import ProcurarOSCNPJ from './Pages/OS/PesquisarOS/ProcurarCNPJ/ProcurarCNPJ';
import ProcurarOSFinalidade from './Pages/OS/PesquisarOS/ProcurarFinalidade/ProcurarFinalidade';
import ProcurarOSSituacao from './Pages/OS/PesquisarOS/ProcurarSituacao/ProcurarSituacao';
import ProcurarOSdtLanca from './Pages/OS/PesquisarOS/ProcurarDtLanc/ProcurarDtLanc';
import ProcurarOSCodigo from './Pages/OS/PesquisarOS/ProcurarCodigo/ProcurarCodigo';
import ProcurarOSNome from './Pages/OS/PesquisarOS/ProcurarNome/ProcurarNome';
import ProcurarOSFantasia from './Pages/OS/PesquisarOS/ProcurarFantasia/ProcurarFantasia';


import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Alias from './Pages/Alias/Alias';
import Vendas from './Pages/Vendas/Vendas';
import Pessoa from './Pages/Pessoa/Pessoa';
import Produtos from './Pages/Produtos/Produtos';
import Revista from './Pages/Revista/Revista';
import PessoaDados from './Pages/Pessoa/AdicionarPessoa/PessoaDados/PessoaDados'
import PessoaLocalizacao from './Pages/Pessoa/AdicionarPessoa/PessoaLocalizacao/PessoaLocalizacao'
import PessoaAdicionais from './Pages/Pessoa/AdicionarPessoa/PessoaAdicionais/PessoaAdicionais';
import ProcurarPessoa from './Pages/Pessoa/ProcurarPessoa/ProcurarPessoa';
import ProcurarPessoaCodigo from './Pages/Pessoa/ProcurarPessoa/ProcurarCodigo/ProcurarCodigo';
import ProcurarPessoaNome from './Pages/Pessoa/ProcurarPessoa/ProcurarNome/ProcurarNome';
import ProcurarPessoaFantasia from './Pages/Pessoa/ProcurarPessoa/ProcurarFantasia/ProcurarFantasia';
import ProcurarPessoaCNPJ from './Pages/Pessoa/ProcurarPessoa/ProcurarCNPJ/ProcurarCNPJ';
import ProcurarPessoaCPF from './Pages/Pessoa/ProcurarPessoa/ProcurarCPF/ProcurarCPF';
import PessoaCadastro from './Pages/Pessoa/ProcurarPessoa/PessoaEncontrada/PessoaEncontrada';
import PessoaLista from './Pages/Pessoa/ProcurarPessoa/PessoaEncontradaLista/PessoaEncontradaLista';
import ProcurarVenda from './Pages/Vendas/PesquisarVenda/PesquisarVenda';
import ProcurarVendaCodigo from './Pages/Vendas/PesquisarVenda/ProcurarCodigo/ProcurarCodigo';
import ProcurarVendaNome from './Pages/Vendas/PesquisarVenda/ProcurarNome/ProcurarNome';
import ProcurarVendaFantasia from './Pages/Vendas/PesquisarVenda/ProcurarFantasia/ProcurarFantasia';
import CodigodeBarras from './Pages/Produtos/ProcurarProdutos/ProcurarCodigodeBarras/ProcurarCodigodeBarras'
import ProdutoEncontradoLista from './Pages/Produtos/ProcurarProdutos/ProdutoEncontradoLista/ProdutoEncontradoLista';
import ProcurarProdutoDescricao from './Pages/Produtos/ProcurarProdutos/ProcurarDescricao/ProcurarDescricao';
import ProcurarFornecedor from './Pages/Produtos/ProcurarProdutos/ProcurarFornecedor/ProcurarFornecedor';
import ProcurarProdutoReferencia from './Pages/Produtos/ProcurarProdutos/ProcurarReferencia/ProcurarReferencia';
import ProcurarProduto from './Pages/Produtos/ProcurarProdutos/ProdutoEncontrado/ProdutoEncontrado';
import ProdutoDados from './Pages/Produtos/AdicionarProduto/ProdutoDados/ProdutoDados';
import ProdutoFinanceiro from './Pages/Produtos/AdicionarProduto/ProdutoFinanceiro/ProdutoFinanceiro';
import ProcurarProdutos from './Pages/Produtos/ProcurarProdutos/ProcurarProdutos';
import ProcurarProdutoCodigo from './Pages/Produtos/ProcurarProdutos/ProcurarCodigo/ProcurarCodigo';
import VendaCadastro from './Pages/Vendas/PesquisarVenda/VendaEncontrada/VendaEncontrada';
import VendaLista from './Pages/Vendas/PesquisarVenda/VendaEncontradaLista/VendaEncontradaLista';
import ProcurarVendaCPF from './Pages/Vendas/PesquisarVenda/ProcurarCPF/ProcurarCPF';
import ProcurarVendaCNPJ from './Pages/Vendas/PesquisarVenda/ProcurarCNPJ/ProcurarCNPJ';
import ProcurarVendaFinalidade from './Pages/Vendas/PesquisarVenda/ProcurarFinalidade/ProcurarFinalidade';
import ProcurarVendaSituacao from './Pages/Vendas/PesquisarVenda/ProcurarSituacao/ProcurarSituacao';
import ProcurarVendadtLanca from './Pages/Vendas/PesquisarVenda/ProcurarDtLanc/ProcurarDtLanc';
import AdicionarVendaPessoa from './Pages/Vendas/AdicionarVenda/AdicionarVendaPessoa/AdicionarVendaPessoa';
import AdicionarVendaPropriedades from './Pages/Vendas/AdicionarVenda/AdicionarVendaPropriedades/AdicionarVendaPropriedades';
import AdicionarVendaProdutos from './Pages/Vendas/AdicionarVenda/AdicionarVendaProdutos/AdicionarVendaProdutos';
import AdicionarVendaFinanceiro from './Pages/Vendas/AdicionarVenda/AdicionarVendaFinanceiro/AdicionarVendaFinanceiro';
import ControleEstoque from './Pages/Controle/Controle';
import ControleItens1 from './Pages/Controle/ControleItens/ControleItens';


const Stack = createStackNavigator()

export default function App() {

  // Config AwesomeAlert
  let styleAwesome = require('./node_modules/react-native-awesome-alerts/src/styles');
  styleAwesome.default.container = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10
  }
  styleAwesome.default.overlay = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
          name="OS"
          component={OS}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="PassagemParam"
          component={PassagemParam}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOS"
          component={ProcurarOS}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarObsOS"
          component={ProcurarObsOS}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="OSLista"
          component={OSLista}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="OSEncontrada"
          component={OSEncontrada}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="OSHandleOBS"
          component={OSHandleOBS}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="OSHandleDefeito"
          component={OSHandleDefeito}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSCodigo"
          component={ProcurarOSCodigo}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSNome"
          component={ProcurarOSNome}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSFantasia"
          component={ProcurarOSFantasia}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSCPF"
          component={ProcurarOSCPF}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSCNPJ"
          component={ProcurarOSCNPJ}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSFinalidade"
          component={ProcurarOSFinalidade}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSSituacao"
          component={ProcurarOSSituacao}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ProcurarOSdtLanca"
          component={ProcurarOSdtLanca}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        

        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
              headerShown:false
          }}
        />

        <Stack.Screen 
          name="Alias" 
          component={Alias} 
          options={{
            headerTransparent: true
          }}
        />

        <Stack.Screen 
          name="Pessoa" 
          component={Pessoa} 
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
            <Stack.Screen 
              name="PessoaDados" 
              component={PessoaDados} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="PessoaLocalizacao" 
              component={PessoaLocalizacao} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="PessoaAdicionais" 
              component={PessoaAdicionais} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="ProcurarPessoa" 
              component={ProcurarPessoa} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
                <Stack.Screen 
                  name="ProcurarPessoaCodigo" 
                  component={ProcurarPessoaCodigo} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarPessoaNome" 
                  component={ProcurarPessoaNome} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarPessoaFantasia" 
                  component={ProcurarPessoaFantasia}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarPessoaCNPJ" 
                  component={ProcurarPessoaCNPJ} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarPessoaCPF" 
                  component={ProcurarPessoaCPF} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="PessoaCadastro" 
                  component={PessoaCadastro} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="PessoaLista" 
                  component={PessoaLista} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />

        <Stack.Screen 
          name="Vendas" 
          component={Vendas} 
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
            <Stack.Screen 
              name="AdicionarVendaPessoa" 
              component={AdicionarVendaPessoa} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="AdicionarVendaPropriedades" 
              component={AdicionarVendaPropriedades} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="AdicionarVendaProdutos" 
              component={AdicionarVendaProdutos} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="AdicionarVendaFinanceiro" 
              component={AdicionarVendaFinanceiro} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="ProcurarVenda" 
              component={ProcurarVenda} 
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
                <Stack.Screen 
                  name="ProcurarVendaCodigo" 
                  component={ProcurarVendaCodigo} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaNome" 
                  component={ProcurarVendaNome} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaFantasia" 
                  component={ProcurarVendaFantasia} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaCPF" 
                  component={ProcurarVendaCPF} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaCNPJ" 
                  component={ProcurarVendaCNPJ} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaFinalidade" 
                  component={ProcurarVendaFinalidade} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendaSituacao" 
                  component={ProcurarVendaSituacao} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarVendadtLanca" 
                  component={ProcurarVendadtLanca} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="VendaCadastro" 
                  component={VendaCadastro} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="VendaLista" 
                  component={VendaLista} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
        
        <Stack.Screen 
          name="Produtos" 
          component={Produtos} 
          options={{
            headerStyle: {
              backgroundColor: '#2c3b76',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
            <Stack.Screen 
              name="ProcurarProdutos" 
              component={ProcurarProdutos}
              options={{
                headerStyle: {
                  backgroundColor: '#2c3b76',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
                <Stack.Screen 
                  name="CodigodeBarras" 
                  component={CodigodeBarras}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />

              <Stack.Screen 
                  name="ProcurarProdutoCodigo" 
                  component={ProcurarProdutoCodigo}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarProdutoDescricao" 
                  component={ProcurarProdutoDescricao}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />

                  <Stack.Screen 
                  name="ProcurarFornecedor" 
                  component={ProcurarFornecedor}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarProdutoReferencia" 
                  component={ProcurarProdutoReferencia}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProcurarProduto" 
                  component={ProcurarProduto} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProdutoDados" 
                  component={ProdutoDados} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProdutoFinanceiro" 
                  component={ProdutoFinanceiro} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen 
                  name="ProdutoEncontradoLista" 
                  component={ProdutoEncontradoLista}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                {/* <Stack.Screen 
                  name="Revista" 
                  component={Revista}
                  options={{
                    headerStyle: {
                      backgroundColor: '#2c3b76',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                 */}
          <Stack.Screen 
            name="ControleEstoque" 
            component={ControleEstoque} 
            options={{
              headerStyle: {
                backgroundColor: '#2c3b76',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          <Stack.Screen 
            name="ControleItens1" 
            component={ControleItens1} 
            options={{
              headerStyle: {
                backgroundColor: '#2c3b76',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          /> 

          

      </Stack.Navigator>
    </NavigationContainer>
  );
}

