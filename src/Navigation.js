import { createStackNavigator, createAppContainer } from 'react-navigation'

import SetTable from './screens/SetTable'
import Menu from './screens/Menu'
import Order from './screens/Order'
import Bill from './screens/Bill'
import Checkout from './screens/Checkout'

const RootStack = createStackNavigator(
    {
        Home: SetTable,
        Menu: Menu,
        Order: Order,
        Bill: Bill,
        Checkout: Checkout
    },
    {
        initialRouteName: 'Home',
    }
)

export default createAppContainer(RootStack)