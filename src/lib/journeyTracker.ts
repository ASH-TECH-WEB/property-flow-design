// Journey Tracker for Complete User Flow
export interface JourneyStep {
  step: number;
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

class JourneyTracker {
  private steps: JourneyStep[] = [];
  private currentStep: number = 0;

  constructor() {
    this.initializeSteps();
  }

  private initializeSteps() {
    this.steps = [
      { step: 1, name: 'User Registration', startTime: 0, status: 'pending' },
      { step: 2, name: 'User Login', startTime: 0, status: 'pending' },
      { step: 3, name: 'Company Setup', startTime: 0, status: 'pending' },
      { step: 4, name: 'Create Parties', startTime: 0, status: 'pending' },
      { step: 5, name: 'Open Party Ledger', startTime: 0, status: 'pending' },
      { step: 6, name: 'Add Transactions', startTime: 0, status: 'pending' },
      { step: 7, name: 'View Trial Balance', startTime: 0, status: 'pending' },
      { step: 8, name: 'Admin Panel Access', startTime: 0, status: 'pending' },
    ];
  }

  startStep(stepNumber: number) {
    const step = this.steps.find(s => s.step === stepNumber);
    if (step) {
      step.startTime = performance.now();
      step.status = 'in_progress';
      this.currentStep = stepNumber;
      
      console.log(`🚀 JOURNEY: Step ${stepNumber} - ${step.name} started`);
      console.log(`📊 JOURNEY: Current step: ${stepNumber}/${this.steps.length}`);
    }
  }

  completeStep(stepNumber: number) {
    const step = this.steps.find(s => s.step === stepNumber);
    if (step) {
      step.endTime = performance.now();
      step.duration = step.endTime - step.startTime;
      step.status = 'completed';
      
      console.log(`✅ JOURNEY: Step ${stepNumber} - ${step.name} completed in ${step.duration.toFixed(2)}ms`);
      
      // Show progress
      const completedSteps = this.steps.filter(s => s.status === 'completed').length;
      console.log(`📊 JOURNEY: Progress: ${completedSteps}/${this.steps.length} steps completed`);
    }
  }

  failStep(stepNumber: number) {
    const step = this.steps.find(s => s.step === stepNumber);
    if (step) {
      step.endTime = performance.now();
      step.duration = step.endTime - step.startTime;
      step.status = 'failed';
      
      console.log(`❌ JOURNEY: Step ${stepNumber} - ${step.name} failed in ${step.duration.toFixed(2)}ms`);
    }
  }

  getJourneySummary() {
    const completedSteps = this.steps.filter(s => s.status === 'completed');
    const totalDuration = completedSteps.reduce((sum, step) => sum + (step.duration || 0), 0);
    
    console.log('📊 JOURNEY SUMMARY:');
    console.log(`📊 Total Steps: ${this.steps.length}`);
    console.log(`📊 Completed Steps: ${completedSteps.length}`);
    console.log(`📊 Total Duration: ${totalDuration.toFixed(2)}ms`);
    
    completedSteps.forEach(step => {
      console.log(`📊 Step ${step.step}: ${step.name} - ${step.duration?.toFixed(2)}ms`);
    });
    
    return {
      totalSteps: this.steps.length,
      completedSteps: completedSteps.length,
      totalDuration,
      steps: this.steps
    };
  }

  reset() {
    this.initializeSteps();
    this.currentStep = 0;
    console.log('🔄 JOURNEY: Journey tracker reset');
  }
}

// Export singleton instance
export const journeyTracker = new JourneyTracker();

// Convenience functions
export const startJourneyStep = (stepNumber: number) => journeyTracker.startStep(stepNumber);
export const completeJourneyStep = (stepNumber: number) => journeyTracker.completeStep(stepNumber);
export const failJourneyStep = (stepNumber: number) => journeyTracker.failStep(stepNumber);
export const getJourneySummary = () => journeyTracker.getJourneySummary();
export const resetJourney = () => journeyTracker.reset();
