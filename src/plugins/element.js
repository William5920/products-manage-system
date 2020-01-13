import Vue from 'vue'
import { 
  Button, 
  Icon, 
  Form, 
  FormItem, 
  Input, 
  Message,   
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  MessageBox,
  Card,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Select,
  Option,
  Divider,
  Upload,
  Cascader,
  Tree,
} from 'element-ui'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Divider);
Vue.use(Upload);
Vue.use(Cascader);
Vue.use(Tree);
