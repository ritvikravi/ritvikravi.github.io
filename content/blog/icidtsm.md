---
title: Manufacturing’s Invisible Bottleneck (and how we're building a system to fix It)
date: 2026-07-29
tag: Research
summary: Combining 3D stereoscopic vision, edge computing, and stochastic modeling to build a real-time ergonomic safety net for industrial workers.
slug: ergonomics_HRC
---

_**NOTE:** If you're on mobile, click on an image to zoom!_

<br>

> **The Reality Check (TL;DR)**
> We have the technology to build hyper-efficient robotic assembly lines... but until those robots understand the physical limits of their human operators, true collaborative manufacturing remains an illusion.

The modern factory floor is truly quite a marvel of modern engineering. Every motor torque, conveyor speed, and robot trajectory is optimized down to the millisecond. But right in the middle of this perfectly choreographed symphony sits the most complex, unpredictable, and vulnerable component of all: the human body.

For months, my professor [Dr.Govind Narayan Sahu](https://smalab.org/) and I have been focused on a quiet crisis in manufacturing. When human operators work alongside collaborative robots (cobots), the division of labor is usually static. The human does tasks A and B; the robot does C and D. But as the shift wears on, human fatigue sets in. The worker gets tired. Posture degrades. The risk of injury spikes.

![0.8](/images/icidtsm_1.png)

*Image above: The poor posture of workers in an industry setting- you'd just know intuitively that they're going to back home with some **really** awful back pain* 

We wanted to know: What if this system with humans and robots could dynamically adapt? What if we could use edge artificial intelligence to assess a worker's biomechanical stress in real time, and automatically hand off ergonomically dangerous tasks to the cobot?

This project, an Edge-AI Ergonomic Risk Framework, recently won [Second Place](https://files.iittp.ac.in/2026/latest_news/best_Paper_Award_Certificate.pdf) overall at the 1st ICIDTSM (_International Conference on Industrial Digital Twins for Smart Manufacturing_) Conference, IIT Madras. But getting it to work required bridging the gap between computer vision, mechanical systems, human anatomy, and ultimately, economics.
<br>

## The Invisible Cost That Has To Be Talked About

Work-related musculoskeletal disorders (**WMSDs**): the slow, compounding damage to muscles, nerves, and tendons, costs the global manufacturing industry billions of dollars annually. Worse, they permanently degrade the quality of life for millions of workers.

![0.4](/images/icidtsm_2.jpg)

When a worker spends eight hours leaning over a workbench manipulating heavy parts, the physical toll isn't immediately obvious. It builds micro-tear by micro-tear. By the time an injury is reported, the damage is done. Collaborative robots were supposed to solve this by taking over the "heavy lifting," but without a way to measure the human operator's strain in real time, the factory system is flying blind.

Collaborative robots were supposed to address this. The original promise of cobots was partnership- machines taking over the physically demanding, repetitive, high-risk tasks so that human workers could focus on the cognitive, dexterous work that robots still struggle with. It's a good vision. The problem is that realizing it requires the system to know, in real time, what the human is actually experiencing. Their posture. Their joint loading. Their fatigue trajectory.

<br>

## Two Solutions, Neither of Them Optimized

When we surveyed how most of the industry currently measures ergonomic risk on the floor, we found a familiar pattern: the available tools were either primitive or impractical, with very little in between.

On one end of the spectrum is the manual and traditional approach. Industrial engineers use standardized observational tools (like RULA or REBA). A trained observer stands on the floor, watches a worker complete a task cycle, and assigns a score. The method has been in use for decades. Its limitations are equally well-documented: it's slow, subjective, discontinuous, and fundamentally retrospective. By the time a risk score is assigned, the shift may already be over.

On the other end is motion capture, the kind used in Hollywood CGI or elite sports biomechanics. This involves placing reflective markers all over a worker's body and using dozens of expensive cameras to track them. It provides beautiful data, but it is deeply impractical. You cannot ask a factory worker to wear a mocap (MOtion-CAPture) suit on a hot, greasy assembly line.

![0.4](/images/icidtsm_3.png)

What the field lacked was a third path: something non-intrusive enough to coexist with normal work, accurate enough to be clinically meaningful, and computationally efficient enough to run continuously without disrupting the production environment.
<br>

## Sensing the Worker Accurately Without Touching Them

Our core design decision was conceptually simple, even if the execution wasn't: instead of instrumenting the human body, we would instrument the environment around it.

If you position the right sensors in the workspace and pair them with the right computational architecture, you can extract biomechanical information from a worker in real time; continuously, non-intrusively, without any wearable device or special equipment on their part. The worker simply works. The system watches, measures, and responds.

The hardware platform we built around was a stereoscopic depth camera paired with a localized edge-computing module. Stereo cameras, cameras that capture two slightly offset images simultaneously, allow you to reconstruct spatial depth the way human eyes do. Combined with modern pose estimation, this gives you a continuous three-dimensional skeleton of the human operator: joint positions, segment orientations, and limb geometry, all updated in real time.

The choice to keep computation local on an edge device rather than streamed to a cloud server wasn't incidental. It was a deliberate systems decision. Latency in a safety-critical application is a critical performance issue. If the system detects that a worker's spine is at dangerous loading and needs to signal the cobot to intervene, that signal needs to arrive in milliseconds, not seconds. Cloud processing introduces latency that a production environment simply can't absorb.

Edge computing also solves a problem that doesn't get discussed enough in industrial AI: worker privacy. A system that continuously streams video of workers to an external server raises serious ethical and legal concerns. Keeping the processing local means the video never leaves the workstation.

![0.7](/images/icidtsm_4.png)
*The lab setup we used: a ZED stereo vision camera, a JAKA Zu 2 cobot, tables and parts to mimic an industry assembly layout, and the Jetson Nano edge device.*

<br>

## When the Physics Refused to Cooperate

The first time we got the skeleton tracking working, watching a three-dimensional skeletal model mirror my own movements in real time on the monitor, it felt like the hard part was behind us. It wasn't.

Engineering problems have a reliable habit of hiding their real difficulty until you've already committed to a direction. Ours revealed itself the moment we introduced a physical object between the worker and the camera.

The problem is called _occlusion_, and it's a fundamental challenge for any vision-based tracking system. In a manufacturing environment, workers are constantly reaching behind parts, holding tools, crossing their arms, leaning around fixtures. At any given moment, portions of the body may be fully invisible to the camera.

When a tracking system loses sight of a joint- a wrist, an elbow- it has to make an inference about where that joint is. Under normal conditions, these inferences are reasonable. But depth-sensing systems have a particular failure mode: when the tracking model loses confidence in a joint's position and begins inferring from surrounding spatial data, the depth estimate can catastrophically drift. 

The model's ray of inference, rather than staying anchored to the worker's body, can project backward through space and land on the nearest hard surface like a wall, a shelf, a piece of equipment.

The result: the system would report that a worker's forearm was fifteen feet long.

![0.8](/images/icidtsm_5.png)
_Early versus late-stage tracking. The left shows keypoints that have drifted significantly from actual joint positions. The right shows the same pipeline after the validation architecture was in place- accurate and robust to motion._

Feed that data into an ergonomic risk calculation, and you get massive false positives. The cobot stops unnecessarily. The production line halts. Workers and supervisors lose confidence in the system. In manufacturing, a system that cries wolf too often gets switched off and then nobody is protected.

We had to solve this before anything else mattered.

<br>

## The Mechanical Engineer's Answer to an AI Problem

The instinctive response to inaccurate AI output is to improve the AI model. More training data, more parameters, more computing power. We didn't do that, and deliberately so. Adding computational complexity to an edge system defeats the core design premise. The value of edge computing is efficiency; undermining that efficiency to fix a data quality problem is solving the wrong problem.

Instead, we went back to first principles. And first principles, for mechanical engineers, means constraints.

The human body is a mechanical system. It obeys kinematic rules. Bones don't elastically deform. Joints have anatomical limits. The distance between an elbow and a wrist has a physical maximum that no amount of camera confusion can override in reality, even if the tracking model thinks otherwise.

![0.6](/images/icidtsm_6.png)
_Adding a gate for data in a particular frame that blew up body length values due to improper depth measurement from keypoint jitter_

We used these constraints as a validation layer: a set of rules derived not from data, but from the geometry of the human body itself. Rather than trusting the vision model's output unconditionally, every reported joint position passes through this layer before it reaches the downstream ergonomic calculation. Outputs that violate the anatomical constraints of the human frame, regardless of how confident the model is, are intercepted and handled before they can corrupt the analysis.

![0.8](/images/icidtsm_7.png)
_Schematic of the validation gate result: any reported joint configuration that exceeds anatomically permissible bounds is isolated before entering the ergonomic calculation pipeline._

The system also incorporated probabilistic filtering to handle situations where constraints alone couldn't fully resolve ambiguity, allowing the tracker to maintain accurate estimates of joint positions through complete occlusions, not just partial ones. From this stabilized tracking foundation, we developed a risk-scoring framework that could quantify ergonomic load across the body in real time and provide a meaningful, interpretable output signal to the cobot.

<br>

## The Question the Engineer Has to Answer

![0.6](/images/simple_demo.gif)
_A demonstration of the **visual** pipeline running in our lab environment: real-time ergonomic monitoring through occlusion conditions, on edge hardware, without wearables._
<br>

For seeing the demonstration of the **complete** pipeline, [click here](https://www.youtube.com/watch?v=4xa3AXpohyk).

<br>
By this point, the system worked. It tracked reliably, scored meaningfully, and could signal the cobot. But working in a lab and being deployed in a factory are two entirely different things. And the person who decides whether a factory deploys a system isn't an engineer, it's a plant manager with a budget and a production target.

<br>

I found myself asking a question that I think every engineer building a product should eventually be forced to answer: _it works in the lab, but will anyone actually buy it?_

Answering that question required leaving biomechanics entirely and entering the domain of operations research. I built a stochastic simulation, a model that runs thousands of randomized factory shift scenarios, drawing from probability distributions built on real industry data. The simulation incorporated injury baseline rates, medical and rehabilitation costs, hardware amortization schedules, and the OEE impact of keeping the line moving with ergonomic task redistribution rather than injury-related stoppages.

The goal wasn't to generate an optimistic headline number. It was to find the scenarios where the system doesn't justify itself to stress-test the economic case against conservative assumptions and see where it holds.

![0.6](/images/edge_ai_economic_propagation.gif)
The Monte Carlo simulation running in real time, modeling the financial trajectory of system deployment across thousands of randomized operational scenarios.
<br>

The results were more robust than we expected. Even under deliberately conservative injury-rate assumptions, _far_ more conservative than industry averages, the system's cost structure allowed it to achieve **positive returns** well within a timeframe that a capital investment committee would consider reasonable. The break-even point wasn't contingent on things going well; it was achievable under conditions where things went poorly.

This is worth noting because it changes the nature of the conversation. The system isn't a premium safety feature that progressive companies adopt for ethical reasons. It's an investment that pencils out on a standard ROI basis, which is the only argument that reliably moves capital in industrial manufacturing.

<br>

## What the Conference Validated and What It Didn't

When this work was presented at [ICIDTSM 2026](https://ge.iitm.ac.in/icidtsm-2026#hero) at IIT Madras, it received Second Place overall. That recognition meant something, but not primarily for the reasons recognition usually does.

What it validated was that the _framing_ of the problem was right. The conference brought together researchers, engineers, and industry practitioners working at the frontier of industrial AI. The conversation in that room wasn't about whether ergonomic monitoring matters, it was about whether the architectural approach we had taken was the right one. And the reception suggested that the constraint-based, edge-native design philosophy resonated with people who had been thinking about this space for years.

What the conference didn't validate, and what no conference paper can, is whether the system will survive contact with an actual production environment. The lab is a controlled setting. A factory floor is not. The next phase of this work involves understanding what the system encounters when it leaves the conditions it was designed in.

<br>

## Where This Goes Next

This project is currently evolving into a full journal paper. Some of the architectural decisions we made, particularly around how domain knowledge can be used to structurally constrain AI behavior in physical systems, have implications that extend beyond ergonomics, and we're exploring the appropriate intellectual property protections for those contributions before publication.

Beyond that, the questions I find most interesting are about domain transfer. The core architecture we've built: real-time spatial tracking, constraint-based validation, probabilistic handling of partial observability, and integrated economic modeling, isn't inherently about manufacturing workers. The same systems-level thinking could be applied anywhere that human physical performance intersects with a consequential outcome.

High-stakes medical environments. Military logistics. Emergency response. These are spaces where monitoring the physical state of a human in real time, non-intrusively, and making intelligent downstream decisions based on that monitoring, could have significant impact. The specific sensor configuration, constraint model, and risk-scoring framework would differ. The architectural principles would not.

I'm genuinely curious about where those extensions lead. That's probably the truest thing I can say about what this project gave me.

<br>

## What This Project Taught Me About Engineering

The technical description of this work: stereo vision, kinematic constraints, stochastic modeling, doesn't capture the actual experience of building it. That experience was characterized by something I wasn't fully expecting- the number of times the problem changed shape.

We started with a computer vision problem and ended up debugging it with mechanical linkage theory. We built a hardware system and then realized the most important validation work was mathematical. We solved an ergonomic monitoring challenge and then discovered that the most difficult remaining question was economic.

Every phase required stepping outside the boundary of what I had originally defined as the project. The mechanical engineer's instinct for physical constraints turned out to be the most important tool we had for stabilizing an AI system. The operations researcher's stochastic modeling turned out to be the most important tool we had for communicating the engineering's value to the people who fund real deployments.

The problems that are genuinely difficult are rarely confined to a single discipline. If they were, someone would have solved them already.

<br>

## Technical Architecture (High-Level)

For readers with a technical background, the system's design rests on four integrated layers:

- **Spatial Perception:** Stereoscopic depth sensing translated into continuous three-dimensional human joint estimation, providing real-time skeletal geometry without any body-worn instrumentation.
- **Constraint Validation:** A first-principles kinematic filter derived from human anatomical limits, applied structurally to intercept and resolve physically implausible sensor outputs before they reach downstream calculations.
- **Probabilistic State Tracking:** A filtering architecture that maintains accurate joint position estimates through partial and complete occlusion conditions by incorporating temporal continuity and uncertainty quantification.
- **Economic Modeling:** Monte Carlo stochastic simulation across randomized operational scenarios, used to characterize the system's financial viability under both favorable and conservative assumptions.

These four layers are designed to be modular. Each can be evaluated, improved, or replaced independently; which matters for a system that needs to evolve as the manufacturing environment it operates in evolves.

<br>

## Get In Touch
If you work in industrial robotics, spatial computing, or human factors engineering; or if you're building in adjacent spaces and want to compare notes, I'd genuinely like to hear from you.

While the **exact result numerics, payback periods, and cost-per-station figures are currently under wraps for upcoming publications**, the sensitivity analysis taught us something more valuable: the system’s ROI isn't dictated by hardware costs, but by how sharply it reduces micro-stoppage downtime. If you're building in this space, optimizing for latency and false-positive suppression will always yield a better financial return than shaving pennies off sensor hardware.

If you'd like to know more about this project or want to collaborate, you can reach me at [Email](mailto:ritvikravi.265@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/ritvik-ravi/). And if this kind of work interests you, there's much more to come very soon on the rest of the portfolio.