import React, { Component } from 'react';
import { notification, Icon, Modal } from 'antd';

class Util extends Component {
  
  /**
   * Mostra uma janela de diálogo de erro
   * @param {string} title Título
   * @param {string} message Corpo da mensagem
   */
  static showErrorNotification(title, message){
    notification.open({
      message: title,
      description: message,
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    });
  };
  /**
   * Mostra uma janela de diálogo de alerta
   * @param {string} title Título
   * @param {string} message Corpo da mensagem
   */
  static showSuccessNotification(title, message) {
    notification.open({
      message: title || 'Sucesso',
      description: message,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    })
  }
/**
 * Mostra uma janela de diálogo de informação
 * @param {string} message Corpo da mensagem
 */
  static showInfoMessage(message){
    Modal.info({
      title: 'Informação',
      content: message,
      onOk() {},
    });
  };
  /**
   * Mostra uma janela de diálogo de sucesso
   * @param {string} message Corpo da mensagem
   */
  static showSuccessMessage (message) {
    Modal.success({
      title: 'Sucesso!',
      content: message,
    });
  };
  
 /**
  * Mostra uma janela de diálogo de erro
  * @param {string} message Corpo da mensagem
  */
  static showErrorMessage(message){
    Modal.error({
      title: 'Erro!',
      content: message,
    });
  };
  
  /**
   * Mostra uma janela de diálogo de alerta
   * @param {string} message Corpo da mensagem
   */
  static showWarningMessage(message) {
    Modal.warning({
      title: 'Alerta!',
      content: message,
    });
  };

  /**
   * Mostra uma janela de diálogo de confirmação
   * @param {string} title Título 
   * @param {string} message Corpo da mensagem
   * @param {function} callbackOk Rotina a ser executada após confirmação
   * @param {function} callbackCancel Rotina a ser executada após cancelamento
   */
   static showConfirm(title, message, callbackOk, callbackCancel) {
    Modal.confirm({
      title: title,
      content: message,
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        if (callbackOk) {
          callbackOk();
        }
      },
      onCancel() {
        if (callbackCancel) {
          callbackCancel();
        }
      },
    });
  };
  /**
   * Retorna um array do tipo {key: 1, value: 'x'}
   * @param {json} obj 
   */
  static getEntries(obj){
    let result = [];
    const entries = Object.entries(obj);
    for(let i = 0; i < entries.length; i++){
      const [key, value] = entries[i];      
      result.push({ key, value});
    }

    return result;
  }
}

export default Util;
