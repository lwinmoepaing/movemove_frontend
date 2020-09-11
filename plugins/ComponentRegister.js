import Vue from 'vue'

// Base UI
import BodyText from '~/components/BaseUI/BodyText'
import TitleText from '~/components/BaseUI/TitleText'
import Container from '~/components/BaseUI/Container'
import EmptySVG from '~/components/BaseUI/EmptySVG'

// Common Components
import ThemeSwitcher from '~/components/Common/ThemeSwitcher'
import LanguageSwitcher from '~/components/Common/LanguageSwitcher'
import Navbar from '~/components/Common/Navbar'
import GlobalSnackbar from '~/components/Common/GlobalSnackbar'
import BackButton from '~/components/Common/BackButton'
import ReloadButton from '~/components/Common/ReloadButton'
// Modals
import ModalLoading from '~/components/Common/ModalLoading'
import BottomDialog from '~/components/Common/Modal/BottomDialog'
// Blogs
import BlogCard from '~/components/Common/Blog/BlogCard'
import BlogForm from '~/components/Common/Blog/BlogForm'

// Map
import Map from '~/components/Common/Map/Map'

// Register All Components
// BaseUI
Vue.component('BodyText', BodyText)
Vue.component('TitleText', TitleText)
Vue.component('Container', Container)
Vue.component('EmptySVG', EmptySVG)

// Commons
Vue.component('ThemeSwitcher', ThemeSwitcher)
Vue.component('LanguageSwitcher', LanguageSwitcher)
Vue.component('Navbar', Navbar)
Vue.component('GlobalSnackbar', GlobalSnackbar)
Vue.component('BackButton', BackButton)
Vue.component('ReloadButton', ReloadButton)
Vue.component('ModalLoading', ModalLoading)
Vue.component('BottomDialog', BottomDialog)

// Map
Vue.component('Map', Map)

// Blog
Vue.component('BlogCard', BlogCard)
Vue.component('BlogForm', BlogForm)
