import React, { Component } from 'react';
import logo from './logo.svg';
import "antd/dist/antd.css"; 
import './App.css';
import WrappedNewUserForm from './NewUserForm'
import UserList from './UserList';
/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `instructions.md` file.
*/

class App extends Component {
  state = {
    users: []
  };

  /**
   * api responsável por tratar os dados armazenados na lista de usuários armazenada em users do objeto state
   */
  dataSource = {
    getAll: () => this.state.users,
     /**
     * Retorna uma nova coleção baseada na lista de usuários
     * @param {json} user objeto JSON contendo os dados do usuário enviado pelo componente filho NewUserForm
     * @param {function} sucessCallbackFunc Rotina executada após criar um usuário
     */ 
    select : (selectorCallbackFunction) => {
      if (this.state.users.length === 0) return [];
      if (selectorCallbackFunction){
        return this.state.users.map(selectorCallbackFunction);
      }
      return [...this.state.users];
    },
    /**
     * Recupera a qtde de registros
     */ 
    getSize: () => this.state.users.length,
     /**
     * Exclui um usuário da lista de usuários armazenada em users do objeto state
     * @param {json} user objeto JSON contendo os dados do usuário enviado pelo componente filho NewUserForm
     */ 
    delete: (user) => {   
      if (this.state.users.length === 0) return;
      this.setState(oldState => ({
        users: oldState.users.filter(usr => usr.userName !== user.userName)
      }))},
    any: (findCallbackFunc) => {
      if (this.state.users.length === 0) return false;
      var userFound = this.state.users.find(findCallbackFunc);
      return (userFound !== undefined);
    },   
    /**
     * Adiciona um novo usuário para a lista de usuários armazenada em users do objeto state
     * @param {json} user objeto JSON contendo os dados do usuário enviado pelo componente filho NewUserForm
     * @param {function} sucessCallbackFunc Rotina executada após criar um usuário
     */ 
    create: (user, sucessCallbackFunc) => {      
      this.setState(oldState => ({
        users: [...oldState.users, user]
      }));
      if (sucessCallbackFunc){
        sucessCallbackFunc();
      }          
    },
      update: (user, updateCallbackFunc) => {
        if (this.state.users.length === 0) return;
        this.setState(oldState => ({
          users: updateCallbackFunc(user, oldState.users)
        }));       
      }  
    }

  /**
   * Renderiza o componente
   */
  render() {
   return (      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="App-content">
          <WrappedNewUserForm dataSource={this.dataSource}/>
          <UserList dataSource={this.dataSource}/>
        </div>
      </div>           
    );
  }
}

export default App;
