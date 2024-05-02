import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  ArrowLeftRight,
  User,
  X,
  Home,
  Search,
  Heart,
  PenSquare,
  AlignLeft,
  MoreHorizontal,
  Repeat,
  MessageSquare,
  RotateCcw,
  Users,
  Share,
  ChevronDown,
  ChevronUp,
  Menu,
  CircleAlert,
  Bookmark,
  History,
  LogOut,
  WandSparkles,
  Award,
  FilePlus2,
  Files,
  icons,
  FileSearch,
  GanttChart,
  CloudUpload,
} from "lucide-react";
import { cn } from "~/services/libs";

export const Icons = {
  cloudUpload: CloudUpload,
  fileSearch: FileSearch,
  files: Files,
  award: Award,
  wandSparkles: WandSparkles,
  logout: LogOut,
  history: History,
  bookmark: Bookmark,
  circleAlert: CircleAlert,
  bell: Bell,
  menu: Menu,
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  share: Share,
  trash: Trash,
  filetext: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  home: Home,
  search: Search,
  pen: PenSquare,
  heart: Heart,
  alignLeft: AlignLeft,
  moreHorizontal: MoreHorizontal,
  repeat: Repeat,
  messageSquare: MessageSquare,
  rotateCcw: RotateCcw,
  users: Users,
  filePlus2: FilePlus2,

  repostCheck: ({ ...props }: LucideProps) => (
    <svg
      aria-label="리포스트"
      fill="currentColor"
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
      {...props}
    >
      <title>리포스트</title>
      <path d="M16.00092,6.00098c.13013,0,.2597-.02649,.3819-.07703,.24493-.10132,.43982-.29626,.54114-.54114,.10095-.24426,.10095-.51929,0-.76367-.0509-.12305-.12451-.23401-.21729-.32642L13.20697,.79297c-.39062-.39062-1.02344-.39062-1.41406,0s-.39062,1.02344,0,1.41406l1.79395,1.79395h-5.31543c-2.90625,0-5.27148,2.36426-5.27148,5.27051v4.22852c0,.55273,.44727,1,1,1s1-.44727,1-1v-4.22852c0-1.80371,1.46777-3.27051,3.27148-3.27051h7.72949Zm3.99707,3.49609c-.55273,0-1,.44727-1,1v4.22754c0,1.80371-1.4668,3.27051-3.27051,3.27051H7.99701c-.13007,0-.2597,.02649-.38184,.0769-.24487,.10132-.43982,.29626-.54114,.54126-.10107,.24426-.10107,.51953,0,.76379,.05084,.12292,.12439,.23389,.21716,.32629l3.50171,3.50366c.19531,.19531,.45117,.29297,.70703,.29297s.51172-.09766,.70703-.29297c.39062-.39062,.39062-1.02344,0-1.41406l-1.79688-1.79785h5.31738c2.90625,0,5.27051-2.36426,5.27051-5.27051v-4.22754c0-.55273-.44727-1-1-1Zm-5.20508-.51074l-3.90527,3.90625-1.68066-1.68066c-.39062-.39062-1.02344-.39062-1.41406,0s-.39062,1.02344,0,1.41406l2.3877,2.3877c.1875,.1875,.44141,.29297,.70703,.29297s.51953-.10547,.70703-.29297l4.6123-4.61328c.39062-.39062,.39062-1.02344,0-1.41406s-1.02344-.39062-1.41406,0Z"></path>
    </svg>
  ),
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.001 2.002C6.47895 2.002 2.00195 6.479 2.00195 12.001C2.00195 16.991 5.65795 21.127 10.439 21.88V14.892H7.89895V12.001H10.439V9.798C10.439 7.29 11.932 5.907 14.215 5.907C15.309 5.907 16.455 6.102 16.455 6.102V8.561H15.191C13.951 8.561 13.563 9.333 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.479 17.523 2.002 12.001 2.002Z"></path>
    </svg>
  ),
  hashnode: ({ ...props }: LucideProps) => (
    <svg {...props} fill="none" viewBox="0 0 334 56">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.39 18.71c-5.133 5.131-5.133 13.449 0 18.58l14.868 14.862c5.133 5.13 13.454 5.13 18.586 0L52.713 37.29c5.132-5.13 5.132-13.448 0-18.579L37.844 3.848c-5.132-5.13-13.453-5.13-18.586 0L4.39 18.71Zm30.666 15.793a9.193 9.193 0 0 0 0-13.006 9.2 9.2 0 0 0-13.01 0 9.193 9.193 0 0 0 0 13.006 9.202 9.202 0 0 0 13.01 0Z"
        fill="#2962FF"
      ></path>
      <path
        d="M68.452 50.037V5.935h8.603v18.289l-1.032-1.376c.727-1.873 1.893-3.249 3.499-4.128 1.644-.917 3.555-1.376 5.735-1.376 2.37 0 4.435.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.49 3.822 1.49 6.192v20.814l-8.602-.007V31.046c0-1.223-.249-2.274-.746-3.153a4.97 4.97 0 0 0-2.007-2.064c-.841-.497-1.835-.745-2.982-.745-1.11 0-2.103.248-2.983.745a5.356 5.356 0 0 0-2.064 2.064c-.46.88-.689 1.93-.689 3.153v18.99h-8.603ZM111.331 50.023c-2.256 0-4.206-.363-5.85-1.09-1.644-.726-2.906-1.758-3.785-3.095-.879-1.376-1.319-3-1.319-4.873 0-1.759.401-3.307 1.204-4.644.803-1.376 2.027-2.523 3.671-3.44 1.682-.917 3.766-1.567 6.251-1.95l9.578-1.547v6.306l-8.029 1.433c-1.224.23-2.161.631-2.811 1.204-.65.535-.975 1.319-.975 2.35 0 .956.364 1.702 1.09 2.237.727.535 1.625.802 2.696.802 1.414 0 2.657-.305 3.728-.917 1.07-.611 1.892-1.433 2.466-2.465a6.923 6.923 0 0 0 .917-3.497v-8.141c0-1.185-.477-2.179-1.433-2.982-.918-.802-2.18-1.203-3.786-1.203-1.529 0-2.886.42-4.072 1.26-1.147.842-1.988 1.95-2.523 3.326l-6.882-3.268a11.17 11.17 0 0 1 2.924-4.529c1.339-1.261 2.945-2.236 4.818-2.924 1.874-.688 3.919-1.032 6.137-1.032 2.638 0 4.97.478 6.997 1.433 2.026.956 3.594 2.294 4.703 4.014 1.147 1.681 1.72 3.65 1.72 5.905v21.369l-8.029-.037V44.29l1.95-.344c-.918 1.376-1.931 2.522-3.04 3.44a11.218 11.218 0 0 1-3.728 1.949c-1.376.459-2.905.688-4.588.688ZM146.202 50.023c-3.441 0-6.443-.803-9.004-2.408-2.524-1.644-4.244-3.841-5.162-6.593l6.309-2.981c.803 1.681 1.892 3 3.269 3.956a7.864 7.864 0 0 0 4.588 1.433c1.224 0 2.16-.249 2.81-.745.65-.497.975-1.185.975-2.065 0-.458-.114-.84-.344-1.146-.229-.344-.573-.65-1.032-.917-.459-.268-1.033-.497-1.721-.688l-5.334-1.49c-2.561-.727-4.53-1.893-5.907-3.498-1.376-1.644-2.065-3.574-2.065-5.79 0-1.95.497-3.65 1.492-5.103.994-1.452 2.389-2.58 4.186-3.383 1.797-.84 3.862-1.26 6.194-1.26 3.059 0 5.736.725 8.03 2.178 2.332 1.414 3.976 3.42 4.932 6.02l-6.366 2.98c-.459-1.299-1.3-2.33-2.524-3.095-1.185-.803-2.542-1.204-4.072-1.204-1.108 0-1.988.23-2.638.688-.612.459-.917 1.09-.917 1.892 0 .42.114.802.344 1.146.229.344.592.65 1.089.918.536.267 1.186.516 1.95.745l4.99 1.49c2.6.765 4.588 1.93 5.965 3.498 1.376 1.529 2.064 3.42 2.064 5.676 0 1.949-.516 3.65-1.548 5.102-.994 1.452-2.39 2.599-4.187 3.44-1.797.802-3.919 1.204-6.366 1.204ZM162.298 49.964V6.004h8.603v18.83l-1.033-1.376c.727-1.873 1.893-3.25 3.499-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.191v20.186h-8.603V31.656c0-1.223-.248-2.274-.745-3.153a4.97 4.97 0 0 0-2.008-2.064c-.841-.497-1.835-.745-2.982-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.879-.688 1.93-.688 3.153v18.298l-8.603.01ZM195.484 49.976V18.673h8.029v6.192l-.458-1.376c.726-1.873 1.892-3.249 3.498-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.503 10.503 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.192v20.123h-8.603V31.687c0-1.223-.248-2.274-.745-3.153a4.974 4.974 0 0 0-2.007-2.064c-.842-.497-1.836-.745-2.983-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.88-.688 1.93-.688 3.153v18.289h-8.603ZM244.213 50.023c-3.097 0-5.927-.707-8.488-2.121a16.67 16.67 0 0 1-6.08-5.79c-1.491-2.485-2.237-5.294-2.237-8.428 0-3.173.746-5.982 2.237-8.428a16.67 16.67 0 0 1 6.08-5.79c2.561-1.415 5.391-2.122 8.488-2.122 3.097 0 5.907.707 8.431 2.121 2.523 1.415 4.53 3.345 6.022 5.79 1.529 2.447 2.294 5.256 2.294 8.429 0 3.134-.765 5.943-2.294 8.427-1.492 2.446-3.499 4.376-6.022 5.79-2.524 1.415-5.334 2.122-8.431 2.122Zm0-7.74c1.567 0 2.925-.363 4.072-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.154-1.032-4.415-.65-1.3-1.568-2.312-2.753-3.038-1.147-.765-2.505-1.147-4.072-1.147-1.568 0-2.944.382-4.13 1.146-1.185.727-2.122 1.74-2.81 3.039-.65 1.261-.975 2.733-.975 4.415 0 1.681.325 3.172.975 4.471.688 1.3 1.625 2.313 2.81 3.039 1.186.726 2.562 1.09 4.13 1.09ZM279.62 50.023c-3.058 0-5.792-.726-8.201-2.179-2.409-1.452-4.321-3.42-5.735-5.905-1.377-2.484-2.065-5.236-2.065-8.255 0-3.058.707-5.81 2.122-8.256 1.415-2.485 3.326-4.453 5.735-5.905 2.409-1.453 5.105-2.179 8.087-2.179 2.294 0 4.321.44 6.079 1.319 1.797.84 3.212 2.045 4.244 3.612l-1.319 1.72V5.935h8.603v44.077h-8.029v-6.41l.803 1.777c-1.071 1.529-2.524 2.695-4.359 3.497-1.835.765-3.824 1.147-5.965 1.147Zm1.033-7.74c1.567 0 2.944-.363 4.129-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.173-1.032-4.472-.65-1.3-1.568-2.313-2.753-3.039s-2.562-1.09-4.129-1.09c-1.568 0-2.983.383-4.244 1.148-1.224.726-2.18 1.738-2.868 3.038-.688 1.261-1.032 2.733-1.032 4.415 0 1.681.344 3.172 1.032 4.471.688 1.3 1.644 2.313 2.868 3.039 1.261.726 2.676 1.09 4.244 1.09ZM317.407 50.023c-3.326 0-6.213-.726-8.66-2.179-2.447-1.49-4.34-3.478-5.678-5.962-1.338-2.484-2.007-5.236-2.007-8.256 0-3.134.688-5.924 2.064-8.37 1.415-2.446 3.308-4.376 5.678-5.79 2.371-1.415 5.047-2.122 8.03-2.122 2.485 0 4.683.401 6.595 1.204 1.912.765 3.518 1.854 4.818 3.268a14.248 14.248 0 0 1 3.04 4.93c.688 1.835 1.032 3.842 1.032 6.02 0 .612-.038 1.223-.115 1.835-.038.573-.134 1.07-.287 1.49H308.46v-6.306h18.582l-4.072 2.981c.383-1.643.364-3.096-.057-4.357-.421-1.3-1.166-2.312-2.237-3.038-1.032-.765-2.313-1.147-3.842-1.147-1.491 0-2.772.363-3.843 1.09-1.071.725-1.873 1.796-2.409 3.21-.535 1.414-.745 3.134-.631 5.16-.153 1.758.058 3.306.631 4.643.574 1.338 1.453 2.39 2.638 3.154 1.186.726 2.62 1.089 4.302 1.089 1.529 0 2.829-.306 3.9-.917a6.554 6.554 0 0 0 2.581-2.523l6.882 3.268c-.612 1.529-1.587 2.866-2.925 4.013-1.3 1.147-2.848 2.045-4.645 2.694-1.797.612-3.767.918-5.908.918Z"
        fill="fill-current"
      ></path>
    </svg>
  ),
  hashnodeDark: ({ ...props }: LucideProps) => (
    <svg {...props} fill="none" viewBox="0 0 334 56">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.464 18.71c-5.133 5.131-5.133 13.449 0 18.58l14.868 14.862c5.133 5.13 13.454 5.13 18.586 0L52.787 37.29c5.132-5.13 5.132-13.448 0-18.579L37.918 3.848c-5.133-5.13-13.454-5.13-18.586 0L4.464 18.71ZM35.13 34.503a9.193 9.193 0 0 0 0-13.006 9.2 9.2 0 0 0-13.01 0 9.193 9.193 0 0 0 0 13.006 9.202 9.202 0 0 0 13.01 0Z"
      ></path>
      <path d="M69.636 49.346V5.966h8.599v18.28l-1.032-1.375c.726-1.872 1.892-3.247 3.497-4.126 1.643-.917 3.554-1.375 5.733-1.375 2.37 0 4.433.496 6.191 1.49a10.498 10.498 0 0 1 4.185 4.183c.994 1.757 1.49 3.82 1.49 6.19v20.113H89.7v-18.28c0-1.223-.248-2.273-.745-3.152a4.97 4.97 0 0 0-2.006-2.063c-.841-.497-1.835-.745-2.981-.745-1.109 0-2.102.248-2.981.745a5.354 5.354 0 0 0-2.064 2.063c-.459.879-.688 1.93-.688 3.152v18.28h-8.6ZM112.496 50.034c-2.255 0-4.204-.363-5.848-1.089-1.643-.726-2.904-1.757-3.783-3.094-.879-1.376-1.319-3-1.319-4.871 0-1.758.401-3.305 1.204-4.642.802-1.375 2.025-2.522 3.669-3.438 1.681-.917 3.764-1.567 6.248-1.949l9.574-1.547v6.304l-8.026 1.432c-1.223.23-2.159.63-2.809 1.204-.649.535-.974 1.318-.974 2.35 0 .954.363 1.7 1.089 2.234.726.535 1.624.802 2.694.802 1.414 0 2.657-.305 3.727-.916 1.07-.612 1.891-1.433 2.465-2.465a6.928 6.928 0 0 0 .917-3.495v-8.138c0-1.184-.478-2.177-1.433-2.98-.917-.802-2.179-1.203-3.784-1.203-1.529 0-2.885.42-4.07 1.26-1.147.841-1.987 1.95-2.523 3.325l-6.879-3.267a11.175 11.175 0 0 1 2.924-4.527c1.338-1.26 2.943-2.235 4.815-2.923 1.873-.687 3.918-1.031 6.134-1.031 2.637 0 4.969.477 6.994 1.432 2.026.956 3.593 2.293 4.701 4.012 1.147 1.68 1.72 3.648 1.72 5.902v20.63h-8.026v-5.042l1.949-.344c-.917 1.375-1.93 2.521-3.038 3.438a11.21 11.21 0 0 1-3.726 1.948c-1.376.459-2.905.688-4.586.688ZM147.351 50.034c-3.44 0-6.44-.802-9-2.407-2.523-1.643-4.243-3.84-5.16-6.59l6.306-2.98c.803 1.681 1.892 3 3.268 3.954a7.86 7.86 0 0 0 4.586 1.433c1.223 0 2.159-.248 2.809-.745.65-.497.975-1.184.975-2.063 0-.459-.115-.84-.344-1.146-.23-.344-.574-.65-1.032-.917-.459-.267-1.032-.497-1.72-.688l-5.332-1.49c-2.56-.726-4.528-1.89-5.904-3.495-1.376-1.643-2.064-3.572-2.064-5.788 0-1.949.497-3.649 1.49-5.1.994-1.452 2.389-2.58 4.185-3.381 1.797-.841 3.86-1.261 6.192-1.261 3.057 0 5.732.726 8.026 2.177 2.331 1.414 3.974 3.42 4.93 6.017l-6.364 2.98c-.458-1.299-1.299-2.33-2.522-3.094-1.185-.802-2.542-1.203-4.07-1.203-1.109 0-1.988.229-2.637.687-.612.459-.918 1.089-.918 1.891 0 .42.115.803.344 1.146.23.344.593.65 1.09.917.535.268 1.184.516 1.949.745l4.987 1.49c2.599.764 4.586 1.93 5.962 3.496 1.376 1.528 2.064 3.419 2.064 5.673 0 1.948-.516 3.648-1.548 5.1-.993 1.452-2.388 2.598-4.185 3.439-1.796.802-3.917 1.203-6.363 1.203ZM163.44 49.346V5.966h8.599v18.28l-1.032-1.375c.726-1.872 1.892-3.247 3.497-4.126 1.643-.917 3.554-1.375 5.733-1.375 2.369 0 4.433.496 6.191 1.49a10.501 10.501 0 0 1 4.185 4.183c.994 1.757 1.49 3.82 1.49 6.19v20.113h-8.599v-18.28c0-1.223-.248-2.273-.745-3.152a4.971 4.971 0 0 0-2.006-2.063c-.841-.497-1.835-.745-2.981-.745-1.109 0-2.102.248-2.981.745a5.357 5.357 0 0 0-2.064 2.063c-.459.879-.688 1.93-.688 3.152v18.28h-8.599ZM196.611 49.346V18.058h8.026v6.189l-.459-1.376c.727-1.872 1.892-3.247 3.497-4.126 1.644-.917 3.555-1.375 5.733-1.375 2.37 0 4.433.496 6.191 1.49a10.489 10.489 0 0 1 4.185 4.183c.994 1.757 1.491 3.82 1.491 6.19v20.113h-8.599v-18.28c0-1.223-.249-2.273-.745-3.152a4.973 4.973 0 0 0-2.007-2.063c-.841-.497-1.834-.745-2.981-.745-1.108 0-2.102.248-2.981.745a5.357 5.357 0 0 0-2.064 2.063c-.458.879-.688 1.93-.688 3.152v18.28h-8.599ZM245.318 50.034c-3.095 0-5.923-.707-8.484-2.12a16.664 16.664 0 0 1-6.077-5.788c-1.49-2.483-2.235-5.291-2.235-8.424 0-3.171.745-5.979 2.235-8.424a16.664 16.664 0 0 1 6.077-5.788c2.561-1.413 5.389-2.12 8.484-2.12 3.096 0 5.905.707 8.428 2.12 2.522 1.414 4.528 3.343 6.019 5.788 1.529 2.445 2.293 5.253 2.293 8.424 0 3.133-.764 5.94-2.293 8.424-1.491 2.445-3.497 4.374-6.019 5.788-2.523 1.413-5.332 2.12-8.428 2.12Zm0-7.736c1.567 0 2.924-.363 4.071-1.089 1.184-.726 2.102-1.738 2.751-3.037.688-1.3 1.032-2.79 1.032-4.47 0-1.681-.344-3.152-1.032-4.413-.649-1.299-1.567-2.31-2.751-3.037-1.147-.764-2.504-1.146-4.071-1.146-1.567 0-2.942.382-4.127 1.146-1.185.726-2.121 1.739-2.809 3.037-.65 1.261-.975 2.732-.975 4.413 0 1.68.325 3.17.975 4.47.688 1.299 1.624 2.311 2.809 3.037s2.56 1.089 4.127 1.089ZM280.71 50.034c-3.057 0-5.79-.726-8.197-2.178-2.408-1.451-4.319-3.419-5.733-5.902-1.376-2.483-2.064-5.234-2.064-8.252 0-3.056.707-5.807 2.121-8.252 1.414-2.483 3.325-4.45 5.733-5.903 2.408-1.451 5.102-2.177 8.083-2.177 2.293 0 4.319.44 6.077 1.318 1.796.84 3.21 2.044 4.242 3.61l-1.319 1.72V5.965h8.6v43.38h-8.026v-5.73l.802 1.776c-1.07 1.528-2.522 2.694-4.357 3.496-1.834.764-3.821 1.146-5.962 1.146Zm1.032-7.736c1.567 0 2.943-.363 4.128-1.089s2.102-1.738 2.752-3.037c.687-1.3 1.031-2.79 1.031-4.47 0-1.681-.344-3.171-1.031-4.47-.65-1.299-1.567-2.311-2.752-3.037-1.185-.726-2.561-1.089-4.128-1.089-1.567 0-2.981.382-4.242 1.146-1.223.726-2.178 1.739-2.866 3.037-.688 1.261-1.032 2.732-1.032 4.413 0 1.68.344 3.17 1.032 4.47.688 1.299 1.643 2.311 2.866 3.037 1.261.726 2.675 1.089 4.242 1.089ZM318.481 50.034c-3.325 0-6.211-.726-8.657-2.178-2.446-1.49-4.338-3.476-5.675-5.96-1.338-2.483-2.007-5.233-2.007-8.251 0-3.133.688-5.922 2.064-8.367 1.414-2.445 3.306-4.374 5.676-5.788 2.369-1.413 5.044-2.12 8.025-2.12 2.485 0 4.682.4 6.593 1.203 1.911.764 3.516 1.853 4.815 3.267a14.224 14.224 0 0 1 3.039 4.928c.688 1.834 1.032 3.84 1.032 6.017 0 .611-.039 1.223-.115 1.834-.038.573-.134 1.07-.287 1.49h-23.446v-6.304h18.574l-4.071 2.98c.383-1.643.363-3.094-.057-4.355-.42-1.3-1.166-2.311-2.236-3.037-1.032-.765-2.312-1.146-3.841-1.146-1.49 0-2.771.362-3.841 1.088-1.07.726-1.872 1.796-2.407 3.21-.535 1.413-.746 3.132-.631 5.157-.153 1.757.057 3.305.631 4.642.573 1.337 1.452 2.387 2.637 3.151 1.184.726 2.618 1.09 4.299 1.09 1.529 0 2.828-.306 3.899-.918a6.548 6.548 0 0 0 2.579-2.521l6.88 3.266c-.612 1.529-1.587 2.866-2.924 4.012-1.3 1.146-2.847 2.044-4.644 2.693-1.796.611-3.764.917-5.904.917Z"></path>
    </svg>
  ),
  hashnodeTypeHeader: ({ ...props }: LucideProps) => (
    <svg fill="none" viewBox="0 0 334 56" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.39 18.71c-5.133 5.131-5.133 13.449 0 18.58l14.868 14.862c5.133 5.13 13.454 5.13 18.586 0L52.713 37.29c5.132-5.13 5.132-13.448 0-18.579L37.844 3.848c-5.132-5.13-13.453-5.13-18.586 0L4.39 18.71Zm30.666 15.793a9.193 9.193 0 0 0 0-13.006 9.2 9.2 0 0 0-13.01 0 9.193 9.193 0 0 0 0 13.006 9.202 9.202 0 0 0 13.01 0Z"
        fill="#2962FF"
      ></path>
      <path
        d="M68.452 50.037V5.935h8.603v18.289l-1.032-1.376c.727-1.873 1.893-3.249 3.499-4.128 1.644-.917 3.555-1.376 5.735-1.376 2.37 0 4.435.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.49 3.822 1.49 6.192v20.814l-8.602-.007V31.046c0-1.223-.249-2.274-.746-3.153a4.97 4.97 0 0 0-2.007-2.064c-.841-.497-1.835-.745-2.982-.745-1.11 0-2.103.248-2.983.745a5.356 5.356 0 0 0-2.064 2.064c-.46.88-.689 1.93-.689 3.153v18.99h-8.603ZM111.331 50.023c-2.256 0-4.206-.363-5.85-1.09-1.644-.726-2.906-1.758-3.785-3.095-.879-1.376-1.319-3-1.319-4.873 0-1.759.401-3.307 1.204-4.644.803-1.376 2.027-2.523 3.671-3.44 1.682-.917 3.766-1.567 6.251-1.95l9.578-1.547v6.306l-8.029 1.433c-1.224.23-2.161.631-2.811 1.204-.65.535-.975 1.319-.975 2.35 0 .956.364 1.702 1.09 2.237.727.535 1.625.802 2.696.802 1.414 0 2.657-.305 3.728-.917 1.07-.611 1.892-1.433 2.466-2.465a6.923 6.923 0 0 0 .917-3.497v-8.141c0-1.185-.477-2.179-1.433-2.982-.918-.802-2.18-1.203-3.786-1.203-1.529 0-2.886.42-4.072 1.26-1.147.842-1.988 1.95-2.523 3.326l-6.882-3.268a11.17 11.17 0 0 1 2.924-4.529c1.339-1.261 2.945-2.236 4.818-2.924 1.874-.688 3.919-1.032 6.137-1.032 2.638 0 4.97.478 6.997 1.433 2.026.956 3.594 2.294 4.703 4.014 1.147 1.681 1.72 3.65 1.72 5.905v21.369l-8.029-.037V44.29l1.95-.344c-.918 1.376-1.931 2.522-3.04 3.44a11.218 11.218 0 0 1-3.728 1.949c-1.376.459-2.905.688-4.588.688ZM146.202 50.023c-3.441 0-6.443-.803-9.004-2.408-2.524-1.644-4.244-3.841-5.162-6.593l6.309-2.981c.803 1.681 1.892 3 3.269 3.956a7.864 7.864 0 0 0 4.588 1.433c1.224 0 2.16-.249 2.81-.745.65-.497.975-1.185.975-2.065 0-.458-.114-.84-.344-1.146-.229-.344-.573-.65-1.032-.917-.459-.268-1.033-.497-1.721-.688l-5.334-1.49c-2.561-.727-4.53-1.893-5.907-3.498-1.376-1.644-2.065-3.574-2.065-5.79 0-1.95.497-3.65 1.492-5.103.994-1.452 2.389-2.58 4.186-3.383 1.797-.84 3.862-1.26 6.194-1.26 3.059 0 5.736.725 8.03 2.178 2.332 1.414 3.976 3.42 4.932 6.02l-6.366 2.98c-.459-1.299-1.3-2.33-2.524-3.095-1.185-.803-2.542-1.204-4.072-1.204-1.108 0-1.988.23-2.638.688-.612.459-.917 1.09-.917 1.892 0 .42.114.802.344 1.146.229.344.592.65 1.089.918.536.267 1.186.516 1.95.745l4.99 1.49c2.6.765 4.588 1.93 5.965 3.498 1.376 1.529 2.064 3.42 2.064 5.676 0 1.949-.516 3.65-1.548 5.102-.994 1.452-2.39 2.599-4.187 3.44-1.797.802-3.919 1.204-6.366 1.204ZM162.298 49.964V6.004h8.603v18.83l-1.033-1.376c.727-1.873 1.893-3.25 3.499-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.191v20.186h-8.603V31.656c0-1.223-.248-2.274-.745-3.153a4.97 4.97 0 0 0-2.008-2.064c-.841-.497-1.835-.745-2.982-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.879-.688 1.93-.688 3.153v18.298l-8.603.01ZM195.484 49.976V18.673h8.029v6.192l-.458-1.376c.726-1.873 1.892-3.249 3.498-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.503 10.503 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.192v20.123h-8.603V31.687c0-1.223-.248-2.274-.745-3.153a4.974 4.974 0 0 0-2.007-2.064c-.842-.497-1.836-.745-2.983-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.88-.688 1.93-.688 3.153v18.289h-8.603ZM244.213 50.023c-3.097 0-5.927-.707-8.488-2.121a16.67 16.67 0 0 1-6.08-5.79c-1.491-2.485-2.237-5.294-2.237-8.428 0-3.173.746-5.982 2.237-8.428a16.67 16.67 0 0 1 6.08-5.79c2.561-1.415 5.391-2.122 8.488-2.122 3.097 0 5.907.707 8.431 2.121 2.523 1.415 4.53 3.345 6.022 5.79 1.529 2.447 2.294 5.256 2.294 8.429 0 3.134-.765 5.943-2.294 8.427-1.492 2.446-3.499 4.376-6.022 5.79-2.524 1.415-5.334 2.122-8.431 2.122Zm0-7.74c1.567 0 2.925-.363 4.072-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.154-1.032-4.415-.65-1.3-1.568-2.312-2.753-3.038-1.147-.765-2.505-1.147-4.072-1.147-1.568 0-2.944.382-4.13 1.146-1.185.727-2.122 1.74-2.81 3.039-.65 1.261-.975 2.733-.975 4.415 0 1.681.325 3.172.975 4.471.688 1.3 1.625 2.313 2.81 3.039 1.186.726 2.562 1.09 4.13 1.09ZM279.62 50.023c-3.058 0-5.792-.726-8.201-2.179-2.409-1.452-4.321-3.42-5.735-5.905-1.377-2.484-2.065-5.236-2.065-8.255 0-3.058.707-5.81 2.122-8.256 1.415-2.485 3.326-4.453 5.735-5.905 2.409-1.453 5.105-2.179 8.087-2.179 2.294 0 4.321.44 6.079 1.319 1.797.84 3.212 2.045 4.244 3.612l-1.319 1.72V5.935h8.603v44.077h-8.029v-6.41l.803 1.777c-1.071 1.529-2.524 2.695-4.359 3.497-1.835.765-3.824 1.147-5.965 1.147Zm1.033-7.74c1.567 0 2.944-.363 4.129-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.173-1.032-4.472-.65-1.3-1.568-2.313-2.753-3.039s-2.562-1.09-4.129-1.09c-1.568 0-2.983.383-4.244 1.148-1.224.726-2.18 1.738-2.868 3.038-.688 1.261-1.032 2.733-1.032 4.415 0 1.681.344 3.172 1.032 4.471.688 1.3 1.644 2.313 2.868 3.039 1.261.726 2.676 1.09 4.244 1.09ZM317.407 50.023c-3.326 0-6.213-.726-8.66-2.179-2.447-1.49-4.34-3.478-5.678-5.962-1.338-2.484-2.007-5.236-2.007-8.256 0-3.134.688-5.924 2.064-8.37 1.415-2.446 3.308-4.376 5.678-5.79 2.371-1.415 5.047-2.122 8.03-2.122 2.485 0 4.683.401 6.595 1.204 1.912.765 3.518 1.854 4.818 3.268a14.248 14.248 0 0 1 3.04 4.93c.688 1.835 1.032 3.842 1.032 6.02 0 .612-.038 1.223-.115 1.835-.038.573-.134 1.07-.287 1.49H308.46v-6.306h18.582l-4.072 2.981c.383-1.643.364-3.096-.057-4.357-.421-1.3-1.166-2.312-2.237-3.038-1.032-.765-2.313-1.147-3.842-1.147-1.491 0-2.772.363-3.843 1.09-1.071.725-1.873 1.796-2.409 3.21-.535 1.414-.745 3.134-.631 5.16-.153 1.758.058 3.306.631 4.643.574 1.338 1.453 2.39 2.638 3.154 1.186.726 2.62 1.089 4.302 1.089 1.529 0 2.829-.306 3.9-.917a6.554 6.554 0 0 0 2.581-2.523l6.882 3.268c-.612 1.529-1.587 2.866-2.925 4.013-1.3 1.147-2.848 2.045-4.645 2.694-1.797.612-3.767.918-5.908.918Z"
        fill="fill-current"
      ></path>
    </svg>
  ),
  hashnodeTypeHeaderMobile: ({ ...props }: LucideProps) => (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.742 66.824c-18.323 18.323-18.323 48.029 0 66.352l53.082 53.082c18.323 18.323 48.029 18.323 66.352 0l53.082-53.082c18.323-18.323 18.323-48.03 0-66.352l-53.082-53.082c-18.323-18.323-48.03-18.323-66.352 0L13.742 66.824zm109.481 56.399c12.826-12.826 12.826-33.62 0-46.446s-33.62-12.826-46.446 0-12.826 33.62 0 46.446 33.62 12.826 46.446 0z"
      ></path>
    </svg>
  ),
  arrowLeftRight: ArrowLeftRight,
  check: Check,
  closeLeftSidebar: ({ ...props }: LucideProps) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_4792_34456"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="18"
        height="18"
        style={{ maskType: "alpha" }}
      >
        <rect
          x="1.875"
          y="1.875"
          width="16.25"
          height="16.25"
          rx="3.12"
          fill="#D9D9D9"
        ></rect>
      </mask>
      <g mask="url(#mask0_4792_34456)">
        <path
          d="M2.5 15V5C2.5 3.61929 3.61929 2.5 5 2.5H7.91667H15C16.3807 2.5 17.5 3.61929 17.5 5V15C17.5 16.3807 16.3807 17.5 15 17.5H5C3.61929 17.5 2.5 16.3807 2.5 15Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M14.9974 9.9974H10.4141M10.4141 9.9974L12.4974 12.0807M10.4141 9.9974L12.4974 7.91406"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M7.91406 2.5V17.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  ),
  openLeftSidebar: ({ ...props }: LucideProps) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_4792_34477"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="18"
        height="18"
        style={{ maskType: "alpha" }}
      >
        <rect
          width="16.25"
          height="16.25"
          rx="3.12"
          transform="matrix(-1 0 0 1 18.125 1.875)"
          fill="#D9D9D9"
        ></rect>
      </mask>
      <g mask="url(#mask0_4792_34477)">
        <path
          d="M17.5 15V5C17.5 3.61929 16.3807 2.5 15 2.5H12.0833H5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M7.91406 2.5V17.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M10.4141 9.9974H14.9974M14.9974 9.9974L12.914 12.0807M14.9974 9.9974L12.914 7.91406"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  ),
  subtitle: GanttChart,
};

export type EditorIconType = keyof typeof icons;

export type EditorIconProps = {
  name: EditorIconType;
  className?: string;
  strokeWidth?: number;
};

export const EditorIcon = React.memo(
  ({ name, className, strokeWidth }: EditorIconProps) => {
    // eslint-disable-next-line import/namespace -- This is a valid import
    const IconComponent = icons[name];

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        className={cn("w-4 h-4", className)}
        strokeWidth={strokeWidth || 2.5}
      />
    );
  }
);

EditorIcon.displayName = "EditorIcon";
