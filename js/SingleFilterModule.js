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
        this.$selected.classList.remove('selected');

        let $target = this.$element.querySelectorAll('a').find(($el) => $el.innerText === value);

        if (!$target) {
            this.$selected = null;
        } else if ($target !== this.$selected) {
            this.$selected.classList.toggle('selected', $target !== this.$selected);
            
            if (self._onChange !== null)
                self._onChange(this.selectedValue, value);
        }

        $target.classList.toggle('selected');            

        this.$selected = $target;
    }
}
