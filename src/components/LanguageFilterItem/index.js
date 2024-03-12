// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filter, filterButtonClicked} = props
  const {id, language, displayStyle} = filter
  const btnStyle = displayStyle ? 'btn_filter' : 'classic_button'

  const onClickLanguageButton = () => {
    filterButtonClicked(id)
  }

  return (
    <li>
      <button
        onClick={onClickLanguageButton}
        className={btnStyle}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
