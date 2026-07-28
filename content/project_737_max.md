---
title: Aero-Propulsive Coupling and the Failure of 737 Max's MCAS
date: 2026-09-20
type: project
tag: Aerospace | Failure analysis
summary: Quantifying the aero-propulsive coupling of the 737 MAX and exploring the mechanical design pivots that could have saved the airframe... and the business
slug: 737_max
---

The Boeing 737 MAX crashes of 2018 and 2019 have been covered extensively. The software failure, the certification shortcuts with the FAA, the corporate decisions. What is missing from the public record, however, is the exact aerodynamic behavior that made MCAS necessary in the first place.

In this piece, I reverse-engineer that missing link. Using publicly available geometry data from FAA type certificate documents, NTSB accident reports, and aerodynamic simulation data modeled on ANSYS, I quantify the exact change in pitching moment coefficient caused by shifting the massive LEAP-1B engine nacelle forward and upward relative to the legacy CFM56 it replaced.

That pitching moment value is the upstream cause of everything that followed. It dictated the control law requirements, the flawed single-sensor architecture, and ultimately, the tragic accidents. With the final analysis, I work backward to evaluate whether the MCAS authority limit was actually sized properly to the aerodynamic problem, and forward to assess three distinct mechanical alternatives Boeing could have chosen in 2011 that wouldn't have required a software band-aid at all.

_Dropping September 20th, targeting arXiv submission alongside portfolio release._