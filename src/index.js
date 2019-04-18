import Home from './screens/home';
import About from './screens/about';
import Login from './screens/login';
import Main from './screens/main';
import CadastroAluno from './screens/cadastroAluno';

import { createStackNavigator } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Home: Home,
    About: About,
    Login: Login,
    Main: Main,
    CadastroAluno: CadastroAluno,
},{
    defaultNavigationOptions : {
        headerStyle: {
            backgroundColor: "#394D7B"
        },
        headerTintColor: "#FFF",
    },
});

export default { StackNavigator };