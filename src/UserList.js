import React from 'react';
/** Importação dos componentes da ANT DESIGN */
import { Table } from 'antd';
import Util from './Util';
import PropTypes from 'prop-types'

class UserList extends React.Component {   
    /**
     * Exclui o registro do usuário
     * @param {json} user Objeto JSON contendo os dados do usuário 
     */
    deleteUser = (user) => {
        Util.showConfirm('Delete user', (<div>Are you sure you want delete the user <b>{user.firstName} {user.lasName}</b>?</div>), () => this.props.dataSource.delete(user));
    };
    /**
     * Alterna a visibilidade do número de jogos do usuário
     * @param {json} user Objeto JSON contendo os dados do usuário 
     */
    toggleVisibilityNumberOGames = (user) => {
        this.props.dataSource.update(user, this.changeVisibilityNumberOGames);
    }
    
    /**
     * Muda a visibilidade do número de jogos do usuário
     * @param {string} userName Nome do usuário
     * @param {Array} users lista de usuários existente
     */
    changeVisibilityNumberOGames = (user, users) => {
        let list = [...users];
        let wasChanged = false;
        const userName = user.userName;
        for(let i = 0; i < list.length && !wasChanged; i++){
            if (list[i].userName === userName) {
                list[i].showNumberOfGames = !list[i].showNumberOfGames
                wasChanged = true;
            }
        }
        return list;
    }
    /**
     * Renderiza o componente
     */
    render(){   
        const columns = [
          {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName'
          }, 
          {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
          },
          {
            title: 'Username',
            dataIndex: 'userName',
            key: 'userName',
          }, 
          {
            title: 'Games',
            key: 'games',
            render: (text, record) => (               
                <span>     
                  {record.userName} played { record.showNumberOfGames ? record.numberOfGames.toString(): '\\*' } games.
                </span>
              )
          }, 
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <div>
                <span>     
                    <button className="ant-btn" onClick={() => {this.deleteUser(record)}}>Delete</button>
                </span>
                <span>     
                    <button style={{ marginLeft: 5 }} className="ant-btn ant-btn-primary" onClick={() => {this.toggleVisibilityNumberOGames(record)}}>{ record.showNumberOfGames ? 'Hide': 'Show' } the Number of Games Played</button>
                </span>
              </div>
            )
          }
        ];
          
        if (this.props.dataSource.getSize() > 0){
            const dataSource = this.props.dataSource.select(user => ({key: user.userName,...user}));
            return (<Table columns={columns} dataSource={dataSource} /> )
        }else{
            return (<div></div>)
        }
    }    
}

/**
 * Validação dos tipos obrigatórios que devem ser repassados pelo componente pai
 */
UserList.propTypes = {
    dataSource: PropTypes.object.isRequired
  }

export default UserList