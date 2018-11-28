import React from 'react';
/** Importação dos componentes da ANT DESIGN */
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types'
import Util from './Util'
/** Passando referência de Form.Item */
const FormItem = Form.Item;

class NewUserForm extends React.Component {
    state = {    
        firstName: '',
        lastName: '',
        userName: '',
        showNumberOfGames: false,
        numberOfGames: 0             
    }

    validation = {
      firstName: { required: true, message: 'Por favor entre com o seu primeiro nome!' },
      lastName:{ required: true, message: 'Por favor entre com o seu sobrenome!' },
      userName: { required: true, message: 'Por favor entre com o seu usuário!' }
    }

    componentDidMount() {
      // Para desabilitar o botão enviar no início
      this.props.form.validateFields();
      this.focusFirstName();
    }

      
    // Usa `ref` callback para armazenar uma referência para o elemento text input DOM em um campo de instância (por exemplo, this.firstNameInput).
    setFirstNameRef = element => {
        this.firstNameInput = element;
    };

    /**
     * Verifica a existência de erro nos inputs
     */
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]) || this.isAnyEmpty();    

    /**
   * Redireciona o foco do elemente input usando a raw DOM API
   */
    focusFirstName = () => {
        // Focus the text input using the raw DOM API
        if (this.firstNameInput) this.firstNameInput.focus();
    };

    /**
     * Envia os dados para o componente pai
     */
    handleSubmit = (e) => {
      e.preventDefault();     
      this.props.form.validateFields((err, values) => {
        if (!err) {      
            const user = {
              ...values,  
              showNumberOfGames: false,
              numberOfGames: 0
            };

            this.setState(user);

            const ds = this.props.dataSource;
            const resetForm = this.resetForm;

            if (ds.any(function(usr){ return usr.userName === user.userName})){
              Util.showErrorMessage((<div>The user <b>{user.userName}</b> already exists!</div>))
            }else{
              ds.create(user, resetForm);
            }           
        }
      });  
    }

  /**
   * Limpa o campo value do objeto state
   */
  clear = () => {
    this.setState({     
      firstName: '',
      lastName: '',
      userName: '',
      showNumberOfGames: false,     
      numberOfGames: 0             
  })
  this.props.form.resetFields();   
}
  /**
   * Verifica se existe algum campo vazio
   */
  isAnyEmpty = () => {
    let empty = false;
    const validationEntries = Util.getEntries(this.validation);
    const stateEntries = Util.getEntries(this.state);
    for(let i = 0; i < stateEntries.length && !empty; i++){
      const {key, value} = stateEntries[i];      
      for (var entry of validationEntries) {
         if (entry.key === key){       
            if (entry.value.required && value.trim() === ''){
              empty = true;
            }          
        }
      }     
    }
    return empty;
  }

  /**
   * Limpa os campos
   */
  resetForm = () => {
    this.clear();
    this.focusFirstName();
  }
  /**
   * Renderiza a tela
   */
    render() {
        /**
         * If the form has been decorated by Form.create then it has this.props.form property. this.props.form provides some APIs:
         * getFieldDecorator: Two-way binding for form
         * getFieldsError: Get the specified fields' error. If you don't specify a parameter, you will get all fields' error.
         * getFieldError: Get the error of a field
         * getFieldsValue: Get the specified fields' values. If you don't specify a parameter, you will get all fields' values.
         * getFieldValue: Get the value of a field.
         * isFieldTouched: Check whether a field is touched by getFieldDecorator's options.trigger event	
         * isFieldsTouched: Check whether any of fields is touched by getFieldDecorator's options.trigger event
         * isFieldValidating: Check if the specified field is being validated.
         * resetFields: Reset the specified fields' value(to initialValue) and status. If you don't specify a parameter, all the fields will be reset.
         */
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
          
      // Somente mostra o erro após o campo ser tocado
      const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
      const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
     
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
 
      return (
        //* Campo primeiro nome */
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
           <FormItem {...formItemLayout} label="First name" validateStatus={firstNameError ? 'error' : ''} help={firstNameError || ''}>
            { getFieldDecorator('firstName', { rules: [this.validation.firstName]})(
              <Input onChange={(event) => this.setState({firstName:event.target.value})} ref={this.setFirstNameRef} placeholder="First name" />
            )}
          </FormItem>

          {/* Campo sobrenome*/}
          <FormItem {...formItemLayout} label="Last name" validateStatus={lastNameError ? 'error' : ''} help={lastNameError || ''}>
            { getFieldDecorator('lastName', { rules: [this.validation.lastName]})(
              <Input onChange={(event) => this.setState({lastName:event.target.value})} placeholder="Last name" />
            )}
          </FormItem>

          {/* Campo usuário */}
          <FormItem {...formItemLayout} label="Username" validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
            { getFieldDecorator('userName', { rules: [this.validation.userName]})(
              <Input onChange={(event) => this.setState({userName:event.target.value})} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>    
      
          <FormItem {... tailFormItemLayout}>
            
            <Button className="ant-btn" type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>
              <Icon type="user-add" />Add
            </Button>
            <Button className="ant-btn" style={{ marginLeft: 8 }} htmlType="button" onClick={this.resetForm} disabled={this.hasErrors(getFieldsError())}>
              <Icon type="close" />Clear
            </Button>
          </FormItem>

         
        </Form>
      );
    }
  }
  
  
/**
 * Validação dos tipos obrigatórios que devem ser repassados pelo componente pai
 */
NewUserForm.propTypes = {
  dataSource: PropTypes.object.isRequired
}

/**
 * form decorated by Form.create and now it has this.props.form property. this.props.form provides some APIs
 */
const WrappedNewUserForm = Form.create()(NewUserForm);  

export default WrappedNewUserForm;