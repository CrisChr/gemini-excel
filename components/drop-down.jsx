import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"


let languages = ["🇨🇳 中文", "🇬🇧 English", "🇭🇰 繁體中文", "🇯🇵 日本語", "🇫🇷 Français", "🇪🇸 español"];

const DropDown = ({language, setLanguage}) => {
  return (
    <Select className='relative text-left w-full' defaultValue={language} onValueChange={val => setLanguage(val) }>
      <SelectTrigger className='w-full'>
        <SelectValue>{language}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            languages.map(lang => {
              return (
                <SelectItem value={lang} key={lang}>
                  {lang}
                </SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropDown;
