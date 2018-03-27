import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'auto-complete',
  templateUrl: 'auto-complete.html'
})
export class AutoComplete {
  @Input() allChoices: string[];
  @Input() label: string;
  @Input() isFocused: boolean;
  @Input() maxLength: number;
  @Input() initialValue: string;
  @Input() suggestionLimit: number;
  @Input() validatorPattern: string;

  @Output() onSelected = new EventEmitter<string>();

  model: string;
  currentIndex: number;
  suggestions: string[];

  constructor() {}

  clearSuggestions() {
    this.isFocused = false;
    this.currentIndex = -1;
    this.onSelected.emit(this.model);
  }

  ngOnInit() {
    this.model = '';
    if (this.initialValue) this.model = this.initialValue;
  }

  onChange($event) {
    if ($event.value.length > 1) {
      this.filterSuggestions($event.value);
    } else {
      this.suggestions = null;
    }
  }

  suggestionSelected(suggestion) {
    this.suggestions = [];
    this.model = suggestion;
    this.onSelected.emit(suggestion);
  }

  onFocus(position, event) {
    this.isFocused = true;
    this.filterSuggestions(event.value);
  }

  filterSuggestions(keyword) {
    this.suggestions = this.allChoices.filter(value =>
      value.toLowerCase().indexOf(keyword && keyword.toLowerCase()) > - 1);
  }

  onKeypress(key) {
    switch(key) {
      case 'ArrowDown':
        this.currentIndex = (this.currentIndex + 1) % this.suggestionLimit;
        break;
      case 'ArrowUp':
        this.currentIndex = (this.currentIndex - 1) % this.suggestionLimit;
        break;
      case 'Enter':
        this.suggestionSelected(this.allChoices[this.currentIndex]);
        break;
    }
  }
}
