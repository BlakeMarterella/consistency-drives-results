import { Component, Input } from '@angular/core';
import { faTriangleExclamation, faSquareXmark, faCircleCheck, IconDefinition  } from '@fortawesome/free-solid-svg-icons';


// Define an enum
export enum SeverityLevel {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

interface severityInfo {
  icon: IconDefinition;
  // Experimental
  emoji?: string;
  // Box styling as a string of Tailwind Classes
  box_styling: string;
}

@Component({
  selector: 'shared-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

  @Input() severity: SeverityLevel;
  // More details about the selected message type
  severityDetails: { [key: string]: severityInfo } = {
    error: {
      icon: faSquareXmark,
      emoji: '🚨',
      box_styling: 'bg-red-100 border border-red-400 text-red-700'
    },
    warning: {
      icon: faTriangleExclamation,
      emoji: '⚠️',
      box_styling: 'bg-yellow-100 border border-yellow-400 text-yellow-700'
    },
    success: {
      icon: faCircleCheck,
      emoji: '✅',
      box_styling: 'bg-green-100 border border-green-400 text-green-700'
    }
  };

}
