export class SingleFilterModule {
    constructor(element) {          
        this.$element = element;
        this._selectedValue = null;
        this.$selected = null;
        this._onChange = null;
        this.$element.addEventListener('click', (event) => {
            if (event.target.tagName !== 'A')
                return;

            let from = null;
            let to = null;
            
            if (this.$selected && this.$selected !== null) {
                this.$selected.classList.remove('selected');
                from = this.$selected.innerText;
            }
            
            if (this.$selected !== event.target) {               
                this.$selected = event.target;
                this.$selected.classList.add('selected');
                to = this.$selected.innerText;
            } else {
                this.$selected == null;
            }
                        
            if (this._onChange !== null)
                this._onChange(from, to);
        });
    }

    set onChange(value) {
        this._onChange = value;
    }
    
    get selectedValue() {
        if (this.$selected)
            return this.$selected.innerText;
        else return null;
    }

    set selectedValue(value) {
        if (this.$selected)
            this.$selected.classList.remove('selected');

        let $target = Array.from(this.$element.querySelectorAll('a')).find(($el) => SingleFilterModule.compareWithNoWhiteSpace($el.innerText, value));

        if ($target !== this.$selected && $target) {                        
            this.$selected = $target;
            
            if (this.$selected !== null)
                this.$selected.classList.toggle('selected');

            if (this._onChange !== null)
                this._onChange(this.selectedValue, value);
        } else {
            return;
        }
    }

    static get compareWithNoWhiteSpace() {
        return (str1, str2) => str1.toUpperCase().replace(' ', '') === str2.toUpperCase().replace(' ', '')
    }
}
